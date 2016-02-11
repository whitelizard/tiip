import extend from 'extend';

/**
 * @title tiip
 * @module tiip
 * @overview Thin Industrial Internet Protocol.
 * @author Esbjörn Blomquist
 */

/**
 * Pack parameters into tiip json
 * @function
 * @param  {string} type    type of message (e.g. pub, sub, req)
 * @param  {string} pid     target module
 * @param  {string} signal  command/API function
 * @param  {object} args    object with arguments
 * @param  {array} payload  array of data
 * @param  {string} mid     message ID
 * @param  {string} tenant  tenant name/id
 * @param  {array} source   array with IDs of nodes that the message passed
 * @param  {string} sid     session ID
 * @param  {boolean} ok     ok signal for reply messages
 * @return {string}         JSON tiip message
 */
export function pack(type, pid, signal, args, payload, mid, tenant, source, sid, ok) {
    var msg = baseMessage();

    if (isSet(type)) msg.type = type;
    if (isSet(pid)) msg.pid = pid;
    if (isSet(signal)) msg.signal = signal;
    if (isSet(args)) msg.arguments = args;
    if (isSet(payload)) msg.payload = payload;
    if (isSet(mid)) msg.mid = mid;
    if (isSet(tenant)) msg.tenant = tenant;
    if (isSet(source)) msg.source = source;
    if (isSet(sid)) msg.sid = sid;
    if (isSet(ok)) msg.ok = ok;

    return JSON.stringify(msg);

    function isSet(value) {
        return (value !== undefined && value !== null);
    }
}

/**
 * Javascript object into tiip JSON message
 * @function
 * @param  {object} obj JS object
 * @return {string}     JSON tiip message
 */
export function packObj(obj) {
    var msg = extend(baseMessage(), obj);
    return JSON.stringify(msg);
}

/**
 * Unpack tiip message into JS object
 * @function
 * @param  {string} textMsg JSON tiip message
 * @return {object}         tiip msg as JS object
 */
export function unpack(textMsg) {
    return JSON.parse(textMsg);
}

/**
 * Unpack tiip message with checking
 * @function
 * @param  {string} textMsg JSON tiip message
 * @return {object}         tiip msg as JS object
 */
export function unpackVerify(textMsg) {
    // TODO: Perform validation etc here
    return unpack(textMsg);
}

function baseMessage() {
    return {
        'protocol': 'tiip.0.8',
        'clientTime': Date.now()/1000+''
    };
}
