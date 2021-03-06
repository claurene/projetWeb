//Menu de tri par thème
$(document).ready(function() {
    $.getJSON('themes.php', function(result) {
        var menu = $('#themes-menu');
        var themes = result['themes'];
        //On affiche tous les themes
        for (var i = 0; i < themes.length; i+=1){
            var li = $('<li/>');
            li.append($('<a/>',{
                href: 'accueil.php?sort='+themes[i]['id'],
                text: themes[i]['name']
            }));
            li.appendTo(menu);
        }
    })
});


//Fonction chargeant les données JSON (pour la grille)
function loadGrid(url) {
    $.getJSON(url, function (result) {
        var grid = $('#grid');
        var series = result['series'];
        //Boucle pour les lignes
        for (var i = 0; i < series.length; i+=4){
            //Boucle pour les séries sur une ligne
            var row = $('<div/>', {
                class: "row"
            });
            row.appendTo(grid);
            for (var j = i; j < i+4; j++){
                //Série n°j
                var div_serie = $('<div/>',{
                    class:"col-md-3 portfolio-item"
                });
                div_serie.appendTo(row);

                //Création de la zone d'affichage de l'image de la série et du lien vers la page infos
                $('<img/>', {
                    id: series[j]['id'],
                    class: "img-responsive",
                    src: "https://image.tmdb.org/t/p/w185"+series[j]['poster_path'],
                    alt: 'poster'
                }).bind('click', function() {
                    document.location.href = "infos.php?serie="+$(this).attr('id');
                }).appendTo(div_serie);

                //Création de la zone informations sous l'image de la série
                div_serie.append(
                    $('<h3/>', {text: series[j]['name']})
                );
            }
        }
    });
}

function loadInfos(url) {
    $.getJSON(url, function (result) {
        var series = result['series'];

        var container = $('<div/>', {
            class: "container col-md-offset-2"
        });
        container.appendTo($('#main'));

        //Titre de la série
        var titre = '<div class="row">' +
            '<div class="col-md-12">' +
            '<h1 class="page-header">' + series[0]['name'] + '</h1>' +
            '</div>' +
            '</div>';
        container.append(titre);

        //Informations sur la série
        var infos = $('<div/>', {
            class: "row"
        });
        infos.appendTo(container);

        //Image de la série
        var image = $('<div/>', {
            class: "col-md-4"
        });
        image.append(
            $('<img/>', {
                class: 'img-responsive',
                src: "https://image.tmdb.org/t/p/w342" + series[0]['poster_path'],
                alt: 'poster'
            }),
            $('<p/>') //Paragraphe vide pour espace légèrement avec le bas de l'écran
        );
        image.appendTo(infos);

        //Description de la série
        var description = $('<div/>', {
            class: "col-md-7"
        });
        description.append(
            $('<h3/>', {text: 'Description'}),
            $('<p/>', {text: series[0]['overview']}),
            $('<h3/>', {text: 'Autres informations'})
        );
        description.appendTo(infos);

        //Autres informations sur la série
        var ul = $('<ul/>');
        ul.append(
            $('<li/>', {text: 'Number of seasons: ' + series[0]['number_of_seasons']}),
            $('<li/>', {text: 'Number of episodes: ' + series[0]['number_of_episodes']}),
            $('<li/>', {text: 'Popularity: ' + series[0]['popularity']}),
            $('<li/>', {text: 'First air date: ' + series[0]['first_air_date']}),
            $('<li/>', {text: 'Last air date: ' + series[0]['last_air_date']})
        );
        ul.appendTo(description);

        //Lien vers saisons de la série :
        description.append(
            $('<h3/>', {text: 'Liste des épisodes par saison'})
        );

        var seasons=$('<div/>',{
            class:'btn-group',
            role:'group'
        });
        for (var i = 1; i <= series[0]['number_of_seasons']; i++) {
            seasons.append(
                $('<a/>', {
                    class: "btn btn-info",
                    href: 'episodes.php?serie=' + series[0]['id'] + '&season='+i,
                    role: 'button',
                    text: 'Saison '+i
                })
            );
        }
        seasons.appendTo(description);

        //Paragraphe vide pour espace légèrement avec le bas de l'écran
        description.append($('<p/>'));
    })
}

/*Fonction affichant les données d'un utilisateur sur sa page personnelle*/
function loadUser(url) {
    $.getJSON(url, function (result) {
        var user = result['series'];
        $('.username').html(user[0]['name']);
        $('.email').html(user[0]['email']);
    });
}

/*Fonction affichant les épisodes d'une série, par saison*/
function loadEpisodes(url){
    $.getJSON(url, function (result) {
        var grid = $('#grid');
        var episodes = result['episodes'];
        //Boucle pour les lignes
        for (var i = 0; i < episodes.length; i+=4){
            //Boucle pour les épisodes sur une ligne
            var row = $('<div/>', {
                class: "row"
            });
            row.appendTo(grid);
            for (var j = i; j < i+4; j++){
                //Épisode n°j
                var div_episode = $('<div/>',{
                    class:"col-md-3 portfolio-item"
                });
                div_episode.appendTo(row);

                //Création de la zone d'affichage de l'image de l'épisode
                $('<img/>', {
                    class: "img-responsive",
                    src: "https://image.tmdb.org/t/p/w300"+episodes[j]['still_path'],
                    alt: 'poster'
                }).appendTo(div_episode);

                //paragraphe vide pour espacer avec l'image
                $('<p/>').appendTo(div_episode);

                //Création d'un bouton pour ajouter les épisodes visionnés à la base de données
                var button = $('<button/>', {
                    type: "button",
                    class: "btn btn-primary",
                    id: episodes[j]['id']
                });
                button.html(
                    '<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>'+" Ajouter aux épisodes visionnés"
                );
                /*Fonction pour ajouter un épisode vu (impossible d'en enlever via cette page pour l'instant)*/
                button.bind('click', function() {
                    document.location.href = "addepisodes.php?view=true&episode="+$(this).attr('id');
                });
                button.appendTo(div_episode);

                //Création de la zone informations sous l'épisode
                div_episode.append(
                    $('<h3/>', {text: episodes[j]['name']}),
                    $('<p/>', {text: 'Episode '+episodes[j]['number']}),
                    $('<p/>', {text: episodes[j]['overview']})
                );
            }
        }

    });
}

function loadUsersEpisodes(url){
    $.getJSON(url, function (result) {
        var div = $('#episodes');
        var episodes = result['episodes'];
        //Boucle pour afficher les épisodes
        for (var i = 0; i < episodes.length; i+=4) {
            //Boucle pour les épisodes sur une ligne
            var row = $('<div/>', {
                class: "row"
            });
            row.appendTo(div);
            for (var j = i; j < i + 4; j++) {
                //Épisode n°j
                var div_episode = $('<div/>', {
                    class: "col-md-3 portfolio-item"
                });
                div_episode.appendTo(row);

                //Création de la zone d'affichage de l'image de l'épisode
                $('<img/>', {
                    class: "img-responsive",
                    src: "https://image.tmdb.org/t/p/w185" + episodes[j]['still_path'],
                    alt: 'poster'
                }).appendTo(div_episode);

                //paragraphe vide pour espacer avec l'image
                $('<p/>').appendTo(div_episode);

                //Création d'un bouton pour supprimer un épisode vu
                var button = $('<button/>', {
                    type: "button",
                    class: "btn btn-danger",
                    id: episodes[j]['episode_id']
                });
                button.html(
                    '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>'+" Supprimer"
                );
                /*Fonction pour supprimer un épisode vu*/
                button.bind('click', function() {
                    document.location.href = "addepisodes.php?view=false&episode="+$(this).attr('id');
                });
                button.appendTo(div_episode);

                //Création de la zone informations sous l'épisode
                div_episode.append(
                    $('<h5/>', {text: episodes[j]['name']})
                );
            }
        }
    });
}