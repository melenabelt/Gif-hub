$(document).ready(function() {
	$('.search').click(function() {
		$('.gifs').empty()
		var entry = $('#search').val().trim().match(/\w\s*/gi).join('')
		var searchTerm = entry.replace(/\s/gi,'+')
		$('#search').val('')
		$('.searched').append("<button class='lol' type='button'>" + entry + "</button>")
		$.ajax({
			url: 'https://api.giphy.com/v1/gifs/search?q=' + searchTerm + '&api_key=dc6zaTOxFJmzC'
		}).done(function(data) {
			console.log(data)
			var currImg
			for (i = 0; i < data.data.length; i++) {
				currImg = data.data[i].images.downsized_medium.url
				$('.gifs').append("<img class='giffed' src='" + currImg + "'/>")
			}
		})
	})

})