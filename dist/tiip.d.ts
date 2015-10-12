export interface ITiipMessage {
    type?: string;
    pid?: string;
    signal?: string;
    payload?: any[];
    ok?: boolean;
    mid?: string;
    destination?: string[];
    source?: string[];
    tenant?: string;
    protocol?: string;
    timestamp?: string;
    clientTime?: string;
}
