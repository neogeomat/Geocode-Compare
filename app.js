$ArcGis_Token = "9F_5Sx0nbWwf8i4JBal_FQDewXsaigcZZsSR-Ee-FkZ6P6Wf3TBGunmVvE2zBRk2iAe7E-e5VluX8F_eBw-mIGeoqWrzf6r2ShDHju5rWcybD4b5d4KUsbxhxT53blDdm1vsa_U_abVMFcFm1f8iWw..";
$Google_Key = "AIzaSyApfrG6VjdVlFPKtgHscWn8i4TTcxhJhpc";

$services = {
    ArcGIS: new L.Control.Geocoder.ArcGis($ArcGis_Token, { geocodingQueryParams: { maxLocations: 2 } }),
    Google: new L.Control.Geocoder.Google($Google_Key),
    HERE: new L.Control.Geocoder.HERE({
        app_id: '0vQvTl6zkTUGkIgKQMgx',
        app_code: 'HUPT7lS5IORK7ToSaZtMbA',
        geocodingQueryParams: { maxresults: 2 }
    }),
    OSM: new L.Control.Geocoder.Nominatim({
        geocodingQueryParams: { limit: 2 }
    })
}

$('#search').click(evt => {
    $query_string = $('#query input')[0].value;
    PopulateList($services);
    PopulateMap($services);
})

function PopulateList(index, service) {
    $.each($services, (index, service) => {
        $services[index].geocode($query_string, response => { listdisplay(response, index) });
    })
}

function PopulateMap(index, service) {
    $markerGroup.clearLayers();
    markerOptions = {
        'ArcGIS': { color: 'red' },
        'Google': { color: 'orange' },
        'HERE': { color: 'blue' },
        'OSM': { color: 'green' }
    }
    if (!$('.legend svg').length) {
        $.each(markerOptions, (index, service) => {
            // legend._container.innerHTML += '<span class = "dot"></span>' + index + '</br>';
            legend._container.innerHTML += '<svg height="30" width="30"><circle cx="15" cy="15" r="10" stroke="' + service.color + '" stroke-width="3" fill="none" /></svg>' + '<span>' + index + '</span></br>';
        });
    }
    $.each($services, (index, service) => {
        $services[index].geocode($query_string, response => { mapdisplay(response, index); });
    });

}

function listdisplay(response, htElement) {
    // console.log(htElement, response);
    $('.geocode-result#' + htElement).children().remove();
    $.each(response, function(index, response) {
        $('.geocode-result#' + htElement).append(
            $('<a>', { href: '#map' }).append(
                $('<div>', { class: "ui-grid-b" }).append(
                    $('<div>', { class: "ui-block-a" }).append(
                        $('<div>', { class: 'ui-bar ui-bar-a', style: "height:40px" }).append(response.name)
                    )
                ).append(
                    $('<div>', { class: "ui-block-b" }).append(
                        $('<div>', { class: 'ui-bar ui-bar-a', style: "height:40px" }).append(response.center.lat)
                    )
                ).append(
                    $('<div>', { class: "ui-block-c" }).append(
                        $('<div>', { class: 'ui-bar ui-bar-a', style: "height:40px" }).append(response.center.lng)
                    )
                )
            )
        )
    });
}
$(document).on("pagebeforeshow", "#WhereAmI", function() {
    $.post("https://www.googleapis.com/geolocation/v1/geolocate?key=" + $Google_Key, function(result) {
        // console.log(result.location.lat, result.location.lng);
        $.each($services, (index, service) => {
            // console.log(index);
            $('.reverse-geocode-result#' + index).children().remove();
            $services[index].reverse(result.location, 18, response => {
                // console.log(response);
                $('.reverse-geocode-result#' + index).append(
                    $('<div>', { class: "ui-grid-b" }).append(
                        $('<div>', { class: "ui-block-a" }).append(
                            $('<div>', { class: 'ui-bar ui-bar-a', style: "height:40px" }).append(response[0].name)
                        )
                    ).append(
                        $('<div>', { class: "ui-block-b" }).append(
                            $('<div>', { class: 'ui-bar ui-bar-a', style: "height:40px" }).append(response[0].center.lat)
                        )
                    ).append(
                        $('<div>', { class: "ui-block-c" }).append(
                            $('<div>', { class: 'ui-bar ui-bar-a', style: "height:40px" }).append(response[0].center.lng)
                        )
                    )
                );
            })
        });
    });
});