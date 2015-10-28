/// <reference path="../../typings/tsd.d.ts" />
export interface ITiipMessage {
    protocol?: string;
    timestamp?: string;
    clientTime?: string;
    mid?: string;
    type?: string;
    source?: string[];
    pid?: string;
    signal?: string;
    payload?: any[];
    ok?: boolean;
    tenant?: string;
}
