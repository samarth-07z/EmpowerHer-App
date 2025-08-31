/// <reference types="vite/client" />

declare global {
  interface Window {
    google: {
      maps: {
        Map: new (element: HTMLElement, options: any) => google.maps.Map;
        Marker: new (options: any) => google.maps.Marker;
        Size: new (width: number, height: number) => google.maps.Size;
        LatLng: new (lat: number, lng: number) => google.maps.LatLng;
        DirectionsService: new () => google.maps.DirectionsService;
        DirectionsRenderer: new (options: any) => google.maps.DirectionsRenderer;
        Geocoder: new () => google.maps.Geocoder;
        LatLngBounds: new () => google.maps.LatLngBounds;
        TravelMode: {
          WALKING: string;
          DRIVING: string;
          BICYCLING: string;
          TRANSIT: string;
        };
      };
    };
  }

  namespace google {
    namespace maps {
      interface Map {
        setCenter(latLng: LatLng): void;
        setZoom(zoom: number): void;
        fitBounds(bounds: LatLngBounds): void;
        getCenter(): LatLng;
        getZoom(): number;
      }

      interface Marker {
        setMap(map: Map | null): void;
        addListener(eventName: string, handler: Function): void;
        position: LatLng;
      }

      interface Size {
        width: number;
        height: number;
      }

      interface LatLng {
        lat(): number;
        lng(): number;
      }

      interface LatLngBounds {
        extend(latLng: LatLng): void;
      }

      interface DirectionsService {
        route(request: DirectionsRequest, callback: (result: DirectionsResult | null, status: DirectionsStatus) => void): void;
      }

      interface DirectionsRenderer {
        setMap(map: Map | null): void;
        setDirections(directions: DirectionsResult | { routes: any[] }): void;
      }

      interface Geocoder {
        geocode(request: GeocoderRequest, callback: (results: GeocoderResult[] | null, status: GeocoderStatus) => void): void;
      }

      interface DirectionsRequest {
        origin: LatLng | string;
        destination: LatLng | string;
        travelMode: string;
      }

      interface DirectionsResult {
        routes: DirectionsRoute[];
      }

      interface DirectionsRoute {
        legs: DirectionsLeg[];
      }

      interface DirectionsLeg {
        start_location: LatLng;
        end_location: LatLng;
      }

      type DirectionsStatus = 'OK' | 'NOT_FOUND' | 'ZERO_RESULTS' | 'MAX_WAYPOINTS_EXCEEDED' | 'MAX_ROUTE_LENGTH_EXCEEDED' | 'INVALID_REQUEST' | 'OVER_QUERY_LIMIT' | 'REQUEST_DENIED' | 'UNKNOWN_ERROR';

      interface GeocoderRequest {
        address: string;
      }

      interface GeocoderResult {
        geometry: {
          location: LatLng;
        };
      }

      type GeocoderStatus = 'OK' | 'ZERO_RESULTS' | 'OVER_QUERY_LIMIT' | 'REQUEST_DENIED' | 'INVALID_REQUEST' | 'UNKNOWN_ERROR';
    }
  }
}

export {};
