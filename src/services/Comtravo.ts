import { API_URL, API_USERNAME, API_PASSWORD } from "../config";
import axios from "axios";
import { response } from "express";

export class ComtravoService {

    public async getFlights() {
        const promises = [this.fetchSource1(), this.fetchSource2()]
        try {
            const flights = await Promise.all(promises)
            const merged_flights = [...flights[0] || [], ...flights[1] || []]
            merged_flights.sort((a, b) => {
                return a.price - b.price;
            })
            const flights_to_return = this.formatedFlights(merged_flights)
            return flights_to_return
        } catch (e) {
            console.log("ERROR", e)
        }
    }

    private fetchSource1() {
        return axios.get(`${API_URL}/source1`).then(res => res.data.flights).catch(() => {
            console.log('ERROR: Retriving data from source 1')
        });
    };

    private fetchSource2() {
        return axios.get(`${API_URL}/source2`, {
            auth: {
                username: API_USERNAME,
                password: API_PASSWORD
            }
        }).then(res => res.data.flights).catch(() => {
            console.log('ERROR: Retriving data from source 2')
        });
    };

    private formatedFlights = (flights: any[]) => {
        return flights.reduce((acc, current) => {

            const t1 = `${current.slices[0].flight_number}-${current.slices[0].departure_date_time_utc}`
            const t2 = `${current.slices[1].flight_number}-${current.slices[1].departure_date_time_utc}`
            const id = [t1, t2].join('|');

            if (acc.temp.indexOf(id) === -1) {
                acc.formatted.push(current);
                acc.temp.push(id);
            }
            return acc;
        }, {
            temp: [],
            formatted: []
        }).formatted;
    }

}