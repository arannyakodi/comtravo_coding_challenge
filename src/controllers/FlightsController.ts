import { ComtravoService } from "../services/Comtravo";

export class FlightsController {
    api = new ComtravoService();

    public async get(req: any, res: any) {
        const flights = await this.api.getFlights();
        res.send({ flights: flights });
    }
}