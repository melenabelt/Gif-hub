$(document).ready(function() {
	var recentSearch
	var search = 0
	if (localStorage.recentSearch) {
		recentSearch = JSON.parse(localStorage.getItem('recentSearch'))
		var temp = recentSearch.length
		if (recentSearch.length == 20) {
			search = parseInt(localStorage.getItem('search'))
		}
		if (recentSearch.length == 20) {
			temp = search
			for (search; search < recentSearch.length; search++) {
				$('.searched').append("<button class='lol' id='button" + search + "' type='button'>" + recentSearch[search] + "</button>")
			}
		}
		for (search = 0; search < temp; search++) {
			$('.searched').append("<button class='lol' id='button" + search + "' type='button'>" + recentSearch[search] + "</button>")
		}
		if (search == 20) {
            search = 0
        }
		
	} else {recentSearch = []}
	$('.search').click(function() {
		$('.gifs').empty()
		var entry = $('#search').val().trim().match(/\w\s*/gi).join('')
		var searchTerm = entry.replace(/\s/gi,'+')
		$('#search').val('')
		if (recentSearch.indexOf(searchTerm) == -1) {
			$('#button' + search).remove()
			$('.searched').append("<button class='lol' id='button" + search + "' type='button'>" + searchTerm + "</button>")
			recentSearch[search] = searchTerm
			search++
		}
        if (search == 20) {
            search = 0
        }
		localStorage.setItem('recentSearch', JSON.stringify(recentSearch))
		localStorage.setItem('search', JSON.stringify(search))
		$.ajax({
			url: 'https://api.giphy.com/v1/gifs/search?q=' + searchTerm + '&limit=10&api_key=dc6zaTOxFJmzC'
		}).done(function(data) {
			var currImg
			for (i = 0; i < data.data.length; i++) {
				currImg = data.data[i].images.original_still.url
				$('.gifs').append("<div class='gifbox'><p>Rating '" + data.data[i].rating + "'</p><img class='giffed' src='" + currImg + "'/></div>")
			}
		})
	})
	$('#search').keypress(function (e) {
 		var key = e.which;
 		if(key == 13) {
    		$('.search').click(); 
  		}
	})
    $(document).on('click','.lol', function() {
        $('.gifs').empty()
        $.ajax({
			url: 'https://api.giphy.com/v1/gifs/search?q=' + this.innerHTML + '&limit=10&api_key=dc6zaTOxFJmzC'
		}).done(function(data) {
			var currImg
			for (i = 0; i < data.data.length; i++) {
				currImg = data.data[i].images.original_still.url
				$('.gifs').append("<div class='gifbox'><p>Rating '" + data.data[i].rating + "'</p><img class='giffed' src='" + currImg + "'/></div>")
			}
		})
    })
	$(document).on('click','.giffed', function() {
		if (this.src.indexOf('giphy_s') > -1) {
			this.src = this.src.replace('giphy_s.gif','giphy.gif')
		} else {this.src = this.src.replace('giphy.gif','giphy_s.gif')}
	})
})