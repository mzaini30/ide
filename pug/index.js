var database_ide = new Dexie('database ide')
database_ide.version(1).stores({
	data: '++id, ide'
})

var tampil_data = () => {
	var isi = ''
	database_ide.data.orderBy('ide').each(data => {
		isi += `
			<tr>
				<td class='teks'>${data.ide}</td>
				<td>
					<div class='btn btn-warning edit' data-edit='${data.id}'>?</div>
				</td>
				<td>
					<div class='btn btn-danger hapus' data-hapus='${data.id}'>&times;</div>
				</td>
			</tr>
		`
	}).then(() => $('.isi').html(isi))
}

tampil_data()

$(document).on('click', '.edit', function(){
	localStorage.setItem('edit', $(this).data('edit'))
	var ubah_data = prompt('Ubah data', $(this).parent().parent().find('.teks').html())
	if (ubah_data){
		database_ide.data.where({
			id: Number(localStorage.edit)
		}).modify({
			ide: ubah_data
		})
		tampil_data()
	}
})

$(document).on('click', '.hapus', function(){
	localStorage.setItem('hapus', $(this).data('hapus'))
	var tanya_dulu = confirm('Hapus kah?')
	if (tanya_dulu){
		database_ide.data.where({
			id: Number(localStorage.hapus)
		}).delete()
		tampil_data()
	}
})

$('.tambah').click(() => {
	var tambah = prompt('Apa idemu?')
	if (tambah){
		database_ide.data.add({
			ide: tambah
		}).then(() => tampil_data())
	}
})