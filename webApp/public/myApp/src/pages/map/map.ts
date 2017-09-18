import { Component, ViewChild, ElementRef} from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation';

declare var google;

@Component({
    selector: 'page-map',
    templateUrl: 'map.html',
    styles: [`
      .scroll {
        height: 100%
      }

      #map {
          height: 100%;
          width: 100%;
      }
    `],
})


export class MapPage {

    options: GeolocationOptions;
    currentPos: Geoposition;
    places: Array<any>;

    @ViewChild("map") mapElement: ElementRef;
    map: any;


    constructor(
        public navCtrl: NavController,
        public geolocation: Geolocation
    ) { }

    ionViewDidEnter() {
        this.getUserPosition();
    }

    getUserPosition() {
        this.options = {
            enableHighAccuracy: false
        };
        this.geolocation.getCurrentPosition(this.options).then((pos: Geoposition) => {

            this.currentPos = pos;

            this.addMap(pos.coords.latitude, pos.coords.longitude);

        }, (err: PositionError) => {
            console.log("error : " + err.message);
            ;
        })
        this.addMap(32.841218, -96.784517);	
    }

    addMap(lat, long) {

        let latLng = new google.maps.LatLng(lat, long);

        let mapOptions = {
            center: latLng,
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

        this.getHospitals(latLng).then((results: Array<any>) => {
            this.places = results;
            console.log(results)
            for (let i = 0; i < results.length; i++) {
                this.createMarker(results[i]);
            }
        }, (status) => console.log(status));

    }


    getHospitals(latLng) {
        var service = new google.maps.places.PlacesService(this.map);
        let request = {
            location: latLng,
            radius: 4000,
            types: ["hospital"]
        };
        return new Promise((resolve, reject) => {
            service.nearbySearch(request, function(results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    resolve(results);
                } else {
                    reject(status);
                }

            });
        });


    }

    createMarker(place) {
        let marker = new google.maps.Marker({
            map: this.map,
            icon: {
                url: place.icon,
                size: new google.maps.Size(35, 35),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            },
            animation: google.maps.Animation.DROP,
            position: place.geometry.location
        });

        let content = '<h5>' + place.name + '</h5><p style="margin:0;">' + place.vicinity + '</p>';
        let infoWindow = new google.maps.InfoWindow({
            content: content,
            pixelOffset: new google.maps.Size(-5, 0)

        });

        google.maps.event.addListener(marker, 'click', () => {
            infoWindow.open(this.map, marker);
        });
    }

}
