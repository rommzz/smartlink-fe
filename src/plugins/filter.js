import Vue from 'vue'

Vue.filter("formatRupiah", function(value) {
	if (typeof value !== "number") {
		return value;
	}
	var formatter = new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR',
	});
	return formatter.format(value).replace(',00', '')
})

Vue.filter("formatNumber", function(value) {
	if (typeof value !== "number") {
		return value;
	}
	var formatter = new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR',
	});	
	return formatter.format(value).toLowerCase().replace('rp', '').replace(',00', '')
})

Vue.filter("formatDate", function(value) {
	const month = [
		'Januari',
		'Februari',
		'Maret',
		'Mei',
		'Juni',
		'Juli',
		'Agustus',
		'September',
		'Oktober',
		'November',
		'Desember',
	]
	const newDate = value.split('-')
	const bulan = month[parseInt(newDate[1]) - 1]
	return newDate[0] + ' ' + bulan + ' ' + newDate[2]
})