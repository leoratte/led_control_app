export class LedConnection {
    ip: string;
    ws: WebSocket;

    constructor(ip: string) {
        this.ip = ip;
        this.connect();
    }

    connect() {
        const url = 'ws://' + this.ip + ':6789';
        this.ws = new WebSocket(url);
    }

    sendStatic(color: string) {

    }

    sendAnimation(animationType: string) {

    }
}
