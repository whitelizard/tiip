/// <reference path="../../typings/tsd.d.ts" />
export interface ITiipMessage {
    type?: string;
    pid?: string;
    signal?: string;
    payload?: any[];
    ok?: boolean;
    mid?: string;
    destination?: string[];
    source?: string[];
    protocol?: string;
    timestamp?: string;
    clientTime?: string;
}
