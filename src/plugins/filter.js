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