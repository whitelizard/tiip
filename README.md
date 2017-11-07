TIIP
====
Thin Industrial Internet Protocol

TIIP is a wire protocol using JSON as its infoset. It is created for lightweight messaging in IoT solutions. It is loosely defined to support custom API creation.

| Key | For | Json data type | Valid values | Mandatory |
| --- | --- | -------------- | ------------ | --------- |
| pv   | Protocol version | String          | tiip.2.0 | Yes |
| ts   | Timestamp        | String          | | Yes |
| ct   | Client timestamp | String          | | No |
| mid  | Message ID       | String          | | No |
| sid  | Session ID       | String          | | No |
| type | Type             | String          | | No |
| ok   | Success/Failure  | Boolean         | | No |
| ten  | Tenant           | String          | | No |
| src  | Source(s)        | Array of String | | No |
| targ | Target           | Array of String | | No |
| arg  | Arguments        | Object          | | No |
| ch   | Data channel     | String          | | No |
| sig  | Signal           | String          | | No |
| pl   | Payload          | Array           | | No |

### Key details

#### pv
Protocol name & version. Ex: "tiip.2.0"

#### ts
Seconds since 1 Jan 1970, as String. Include as many decimals as needed for increased accuracy (millisecond accuracy is often convenient).
Handeled centrally - for instance set by the server for each messages on their arrival. See also `ct`.

#### ct
Seconds since 1 Jan 1970, as String. The timestamp set by clients (devices) when a message is constructed. This is separate to `ts` because it can not be trusted by the central point (server) to be correct or same as every other message creator in the system.

#### mid
Message ID. To identify an answer to a request for instance, in asynchronous communication.

#### sid
Session ID/token. To identify a session in case of non-implicit sessions.

#### type
Some different standard values are:
- **init, kill**: Messages for persistent connections, a "login" message (answered with *rep*) and a disconnect message.
- **req, rep**: Request-reply pattern.
- **sub**: Publish-subscribe pattern: Subscription request.
- **pub, unsub**: Publish-subscribe pattern: Publication and unsubscribe messages (no replies).
- create, read, update, delete: The standard "CRUD": the four basic functions of persistant storage, to use instead of req if desired.

#### ok
Simple boolean key in reply messages only, that indicates the outcome - if it was successful or failed.

#### ten
ID of a tenant in a multi-tenancy solution.

#### src
Path of ID(s) of the origin module(s) or node(s).

#### targ
The targeted process(es) or sub-system(s). Specifically an array of IDs that the receiver can use to route the message internally.

#### arg
Parameters/switches to specify a request even deeper. Often regarded as the "arguments" to the requested API "function" specified in `sig`. Not to confuse with `pl` which is actual data or content.

#### ch
The data channel, as a string, that carries the data. Suitable in the pub/sub pattern.

#### sig
Meant to be used as the "function" of the API between 2 communication nodes -- the operation or command to the receiver. (`arg` contains the function's "arguments".)

#### pl
Actual content or data to be sent, as a list.

**Ex:**
- Sensor values (push data from a device)
- User records (as answer on a request to a database module)
- Notification records published on an internal bus channel
- An error message

### By example
A gateway sends position data to the server:
```json
{
    "pv": "tiip.2.0",
    "ts": "1379921889.4",
    "type": "pub",
    "sig": "updatePosition",
    "arg": {"channelId": "x72iuP"},
    "src": ["gpsSensor239"],
    "pl": [{"long": 59.21625, "lat": 10.93167}]
}
```

Message from the server to a gateway that the motor should be stopped:
```json
{
    "pv": "tiip.2.0",
    "ts": "1387345934.702",
    "type": "req",
    "targ": ["g13", "motor"],
    "sig": "stop"
}
```

Message from a web client to make a change in the configuration data of a user:
```json
{
    "pv": "tiip.2.0",
    "ts": "1387349004.221",
    "type": "req",
    "targ": ["configuration"],
    "sig": "updateUserDashboard",
    "arg": {"id": "4Xd0hN3z", "widgets": ["map", "temperature", "alarms"]}
}
```

## Proposal: Server Init API
### Requests, Client to Server

"-" ignored or not present

| Keys | init |
|---|---|
| **type** | init |
| **mid** | *message-id* |
| **arg** | *Init-arguments (id, password, ...)* |

Further, **targ**, **sig** and **pl** can be used for specific purposes. As an example, **targ** can be used to target the use of a certain client controller or session type.

## Proposal: Server PUB/SUB API
### Requests, Client to Server

"-" ignored or not present

| Keys | sub (realtime) | sub (conf changes) | unsub (realtime) | unsub (conf changes) | pub (realtime) |
|---|---|---|---|---|---|
| **type** | sub | sub | unsub | unsub | pub |
| **ct** | - | - | - | - | *time*\* |
| **ts** | - | - | - | - | *time* |
| **ten** | *tenant-id* | *tenant-id* | *tenant-id* | *tenant-id* | *tenant-id*  |
| **src** | - | - | - | - | *source(s)* |
| **targ** | - | conf | - | conf | - |
| **arg** | {"subChannel": *sub-channel*} | {"action": *CUD*, "entityClass": *entity-class*, "rid": *record-id*} | - | - | {"subChannel": *sub-channel*} |
| **ch** | *channel-record-id* | - | *channel* | *channel* | *channel-record-id* |
| **sig** | - | - | - | - | *data* |
| **pl** | - | - | - | - | *data* |

\* In case of older data and/or client hierarchy

### Replies on above

| Keys | sub (realtime) | sub (conf changes) | unsub (realtime) | unsub (conf changes) | pub (realtime) |
|---|---|---|---|---|---|
| **type** | rep | rep | - | - | - |
| **ok** | true/false | true/false | - | - | - |
| **pl** | *channel/error-message* | *channel/error-message* | - | - | - |

### Messages, Server to Client

| Keys | pub (realtime) | pub (conf changes) |
|---|---|---|
| **type** | pub | pub |
| **ct** | *time* | - |
| **ts** | *time* | *time* |
| **src** | *source(s)* | *source(s)* |
| **ch** | *channel* | *channel* |
| **sig** | *data* | *data* |
| **pl** | *data* | *data* |

## Proposal: Server REQ/REP API
### Requests, Client to Server

| Keys | req |
|---|---|
| **type** | req |
| **mid** | *message-id* |
| **ten** | *tenant-id* |
| **targ** | *module-id* |
| **arg** | *API-function-arguments* |
| **sig** | *API-function* |

### Replies on above

| Keys | rep |
|---|---|
| **type** | rep |
| **mid** | *mirrored-message-id* |
| **ok** | true/false |
| **sig** | *error-code* |
| **pl** | *data/error-message* |
