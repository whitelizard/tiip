/// <reference path="../../typings/tsd.d.ts" />
export interface ITiipMessage {
    protocol?: string;
    timestamp?: string;
    clientTime?: string;
    type?: string;
    pid?: string;
    signal?: string;
    arguments?: {
        string: any;
    };
    payload?: any[];
    mid?: string;
    tenant?: string;
    source?: string[];
    sid?: string;
    ok?: boolean;
}
