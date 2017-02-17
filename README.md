TIIP
====
Thin Industrial Internet Protocol

TIIP is a wire protocol using JSON as its infoset. It is created for lightweight messaging in IoT solutions. It is loosely defined to support API creation.

| Key | Description | Json data type | Valid values | Mandatory |
| --- | ----------- | -------------- | ------------ | --------- |
| protocol   | Protocol name/version                                            | String          | tiip.1.0 | Yes |
| timestamp  | Seconds since 1 Jan 1970, as String. Preferrably centrally controlled. | String          |          | No (Yes if no clientTime) |
| clientTime | Timestamp from client. Seconds since 1 Jan 1970, as String.      | String          |          | No (Yes if no timestamp) |
| mid        | Message ID.                                                      | String          |          | No |
| sid        | Session ID.                                                      | String          |          | No |
| type       | Message type (see recommended values in details below).          | String          |          | No |
| ok         | Boolean indicating success or failure. (Only for replies)        | Boolean         |          | No |
| tenant     | ID of a tenant in a multi-tenancy solution.                      | String          |          | No |
| source     | ID(s) of the origin module(s) or node(s).                        | Array of String |          | No |
| target     | Id of the *targeted* process or sub-system.                      | String          |          | No |
| subTarget  | Id of a possible sub-process to target.                          | String          |          | No |
| arguments  | Named arguments or data.                                         | Object          |          | No |
| channel    | Data channel in case of pub/sub for instance.                    | String          |          | No |
| signal     | The intended operation or command.                               | String          |          | No |
| payload    | List of data.                                                    | Array           |          | No |

### Key details

#### protocol
The name/ID of the protocol (including version). Ex: "tiip.1.0"

#### timestamp
Seconds since 1 Jan 1970, as String. Include as many decimals as needed for increased accuracy (millisecond accuracy is often convenient).
Handeled centrally - for instance set by the server for each messages on their arrival. See also `clientTime`.

#### clientTime
The timestamp set by clients (devices) when a message is constructed. This is separate to `timestamp` because it can not be trusted by the central point (server) to be correct or same as every other message creator in the system.

#### mid
Message ID. To identify an answer to a request for instance, in asyncronous communication.

#### sid
Session ID. To identify a session in case of non-implicit sessions.

#### type
Some different standard values are:
- **init, kill**: Messages for persistant connections, a "login" message (answered with *rep*) and a disconnect message.
- **req, rep**: Request-reply pattern.
- **sub**: Publish-subscribe pattern: Subscription request.
- **pub, unsub**: Publish-subscribe pattern: Publication and unsubscribe messages (no replies).
- create, read, update, delete: The standard "CRUD": the four basic functions of persistant storage, to use instead of req if desired.

#### ok
Simple boolean key in reply messages only, that indicates the outcome - if it was successful or failed.

#### tenant
ID of a tenant in a multi-tenancy solution.

#### source
Origin ID, with prepended nodes further along the communication chain if needed.

#### target
The targeted process or sub-system. An ID or address that the receiver can use to route the message internally.

#### subTarget
A possible sub-process to target inside the `target`. If for example `target` is an external node of some sort, and it is needed to specify a targeted process inside that.

#### arguments
Parameters/switches to specify the message even deeper. Often regarded as the "arguments" to the requested API "function" specified in `signal`. Not to confuse with `payload` which is actual data or content.

#### channel
The data channel, as a string, that carries the message. Suitable in the pub/sub pattern.

#### signal
Meant to be used as the "function" of the API between 2 communication nodes -- the command to the receiver. (`payload` contains the functions "arguments".)

#### payload
Content to be sent, as a list.

**Ex:**
- Sensor values (push data from a device)
- User records (as answer on a request to a database module)
- Notification records published on an internal bus channel
- An error message
- etc.

### By example
A gateway sends position data to the server:
```json
{
    "protocol": "tiip.1.0",
    "clientTime": "1379921889.4",
    "type": "pub",
    "signal": "updatePosition",
    "arguments": {"channelId": "x72iuP"},
    "source": ["gpsSensor239"],
    "payload": [{"long": 59.21625, "lat": 10.93167}]
}
```

Message from the server to a gateway that the motor should be stopped:
```json
{
    "protocol": "tiip.1.0",
    "timestamp": "1387345934.702",
    "type": "req",
    "target": "g13",
    "subTarget": "motor",
    "signal": "stop"
}
```

Message from a web client to make a change in the configuration data of a user:
```json
{
    "protocol": "tiip.1.0",
    "clientTime": "1387349004.221",
    "type": "req",
    "target": "configuration",
    "signal": "updateUserDashboard",
    "arguments": {"id": "4Xd0hN3z", "widgets": ["map", "temperature", "alarms"]}
}
```

## Proposal: Server Init API
### Requests, Client to Server

"-" ignored or not present

| Keys | init |
|---|---|
| **type** | init |
| **mid** | *message-id* |
| **arguments** | *Init-arguments (id, password, ...)* |

Further, **target**, **signal** and **payload** can be used for specific purposes. As an example, **target** can be used to target the use of a certain client controller or session type.

## Proposal: Server PUB/SUB API
### Requests, Client to Server

"-" ignored or not present

| Keys | sub (realtime) | sub (conf changes) | unsub (realtime) | unsub (conf changes) | pub (realtime) |
|---|---|---|---|---|---|
| **type** | sub | sub | unsub | unsub | pub |
| **clientTime** | - | - | - | - | *time*\* |
| **timestamp** | - | - | - | - | *time* |
| **mid** | *mid* | *mid* | - | - | - |
| **tenant** | *tenant-id* | *tenant-id* | *tenant-id* | *tenant-id* | *tenant-id*  |
| **source** | - | - | - | - | *source(s)* |
| **target** | - | conf | - | conf | - |
| **arguments** | {"subChannel": *sub-channel*} | {"action": *CUD*, "entityClass": *entity-class*, "rid": *record-id*} | - | - | {"subChannel": *sub-channel*} |
| **channel** | *channel-record-id* | - | *channel* | *channel* | *channel-record-id* |
| **signal** | - | - | - | - | *data* |
| **payload** | - | - | - | - | *data* |

\* In case of older data and/or client hierarchy

### Replies on above

| Keys | sub (realtime) | sub (conf changes) | unsub (realtime) | unsub (conf changes) | pub (realtime) |
|---|---|---|---|---|---|
| **type** | rep | rep | - | - | - |
| **mid** | *mid* | *mid* | - | - | - |
| **ok** | true/false | true/false | - | - | - |
| **channel** | *channel* | *channel* | - | - | - |
| **payload** | *error-message* | *error-message* | - | - | - |

### Messages, Server to Client

| Keys | pub (realtime) | pub (conf changes) |
|---|---|---|
| **type** | pub | pub |
| **clientTime** | *time* | - |
| **timestamp** | *time* | *time* |
| **source** | *source(s)* | *source(s)* |
| **channel** | *channel* | *channel* |
| **signal** | *data* | *data* |
| **payload** | *data* | *data* |

## Proposal: Server REQ/REP API
### Requests, Client to Server

| Keys | req |
|---|---|
| **type** | req |
| **mid** | *message-id* |
| **tenant** | *tenant-id* |
| **target** | *module-id* |
| **subTarget** | *submodule-id* |
| **arguments** | *API-function-arguments* |
| **signal** | *API-function* |

### Replies on above

| Keys | rep |
|---|---|
| **type** | rep |
| **mid** | *mirrored-message-id* |
| **ok** | true/false |
| **signal** | *error-code* |
| **payload** | *data/error-message* |
