"""
Thin Industrial Internet Protocol 0.7

EX. USAGE:

    import tiip07 as tiip
    
    msg = ws.receive()
    msgDict = tiip.unpack(msg)
    
    if msgDict['signal'] == 'init':
        ...
    
    tiip.pack(msgType='pub', pid='measurement', signal='position', payload=[X, X])
"""

import time

try:
    import simplejson as json
except ImportError:
    import json


# ============================================================
# UTILS

def getTimestamp():
    return round(time.time(), 3)


# ============================================================
# FORMATS

def format(pid=None, signal=None, ok=None, payload=None, msgType=None, destination=None, source=None, clientTime=None, mid=None):
    """
    Creates protocol message structure as a dictionary
    TODO: like unpackExternal, it's needed different format/pack for client that adds clientTime instead of timestamp
    """
    msg = {
        'protocol': 'tiip.0.7',
        'timestamp': repr(getTimestamp())
    }
    if pid is not None:
        msg['pid'] = pid
    if signal is not None:
        msg['signal'] = signal
    if ok is not None:
        msg['ok'] = ok
    if payload is not None:
        msg['payload'] = payload
    if msgType is not None:
        msg['type'] = msgType
    if destination is not None:
        msg['destination'] = destination
    if source is not None:
        msg['source'] = source
    if clientTime is not None:
        msg['clientTime'] = clientTime
    if mid is not None:
        msg['mid'] = mid

    return msg


def pack(pid=None, signal=None, ok=None, payload=None, msgType=None, destination=None, source=None, clientTime=None, mid=None):
    """
    Creates JSON protocol message
    """
    return json.dumps(format(pid, signal, ok, payload, msgType, destination, source,
         clientTime, mid))  # TODO: no need to str cast here? We should do it in the bus client if needed? -Removed


def packRaw(**kwargs):
    """
    Same as pack but without matching of keys.
    """
    kwargs['protocol'] = 'tiip.0.7'
    kwargs['timestamp'] = str(getTimestamp())
    return str(json.dumps(kwargs))


def unpack(msgStr):
    return json.loads(msgStr)


def safeUnpack(msgStr):  # backwards compatibility, use unpackVerify
    return unpackVerify(msgStr)


def unpackVerify(msgStr):
    """
    The reversing of dump, with format checking. Raises KeyError if checking went bad
    """
    msgDict = json.loads(msgStr)
    err = isBadFormat(msgDict)
    if err:
        raise KeyError(err)
    return msgDict


def unpackExternal(msgStr):
    msgDict = json.loads(msgStr)
    msgDict['timestamp'] = str(getTimestamp())
    return msgDict


def unpackExternalVerify(msgStr):
    """
    The reversing of pack, with format checking. Raises KeyError if checking went bad
    """
    msgDict = json.loads(msgStr)
    msgDict['timestamp'] = str(getTimestamp())
    err = isBadFormat(msgDict)
    if err:
        raise KeyError(err)
    return msgDict


def unpackRegistration(msgStr):
    """
    Returns registration message in tiip. TODO: add to testing
    """
    return unpackVerify(msgStr)


def registrationResponse(registered, signal=None, mid=None):  # TODO: add to testing, write docstring
    return pack(msgType='reply', ok=registered, signal=signal, mid=mid)


#============================================================
# VERIFY

def isBadFormat(msgDict):
    """
    Verify tiip.0.7. Returns None if it's ok, otherwise an error message
    """
    if 'protocol' not in msgDict:
        return 'Mandatory key "protocol" missing'
    if msgDict['protocol'] != 'tiip.0.7':
        return 'Wrong protocol. Should be "tiip.0.7"'
    for key in msgDict:
        if not key in ['protocol', 'timestamp', 'type', 'pid', 'signal', 'ok', 'payload', 'destination', 'source',
                       'clientTime', 'mid']:
            return 'Unrecognized key'
    # TODO: add type testing?
    return

