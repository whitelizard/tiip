# TIIP

Thin Industrial Internet Protocol

TIIP is a wire protocol using JSON as its infoset. It is created for lightweight messaging in IoT solutions. It is loosely defined to support custom API creation.

| Key  | For              | Json data type  | Valid values | Mandatory |
| ---- | ---------------- | --------------- | ------------ | --------- |
| pv   | Protocol version | String          | tiip.3.0     | Yes       |
| ts   | Timestamp        | String          |              | Yes       |
| lat  | Latency          | String          |              | No        |
| mid  | Message ID       | String          |              | No        |
| sid  | Session ID       | String          |              | No        |
| type | Type             | String          |              | No        |
| ok   | Success/Failure  | Boolean         |              | No        |
| ten  | Tenant           | String          |              | No        |
| src  | Source(s)        | Array of String |              | No        |
| targ | Target           | Array of String |              | No        |
| arg  | Arguments        | Object          |              | No        |
| ch   | Data channel     | String          |              | No        |
| sig  | Signal           | String          |              | No        |
| pl   | Payload          | Array           |              | No        |

### Key details

#### pv

Protocol name & version. Ex: "tiip.3.0"

#### ts

The timestamp of the message must be in the following ISO 8601 format:

```
YYYY-MM-DDThh:mm:ss.fZ
```

Include as many decimals as needed for increased accuracy. Typically milliseconds, but some applications might require higher precision.

#### lat

Latency or time difference of the message in seconds as string. Typically registered by a central server as the message arrives by comparing ts with the current time of the centralized node.

#### mid

Message ID. To identify an answer to a request for instance, in asynchronous communication.

#### sid

Session ID/token. To identify a session in case of non-implicit sessions.

#### type

Some different standard values are:

- **init, kill**: Messages for persistent connections, a "login" message (answered with _rep_) and a disconnect message.
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
  "pv": "tiip.3.0",
  "ts": "2019-04-08T19:32:32.598278Z",
  "type": "pub",
  "sig": "updatePosition",
  "arg": { "channelId": "x72iuP" },
  "src": ["gpsSensor239"],
  "pl": [{ "long": 59.21625, "lat": 10.93167 }]
}
```

Message from the server to a gateway that the motor should be stopped:

```json
{
  "pv": "tiip.3.0",
  "ts": "2019-04-08T19:36:32.598Z",
  "type": "req",
  "targ": ["g13", "motor"],
  "sig": "stop"
}
```

Message from a web client to make a change in the configuration data of a user:

```json
{
  "pv": "tiip.3.0",
  "ts": "2019-04-08T19:37:32.4Z",
  "type": "req",
  "targ": ["configuration"],
  "sig": "updateUserDashboard",
  "arg": { "id": "4Xd0hN3z", "widgets": ["map", "temperature", "alarms"] }
}
```

## Proposal: Server Init API

### Requests, Client to Server

"-" ignored or not present

| Keys     | init                                 |
| -------- | ------------------------------------ |
| **type** | init                                 |
| **mid**  | _message-id_                         |
| **arg**  | _Init-arguments (id, password, ...)_ |

Further, **targ**, **sig** and **pl** can be used for specific purposes. As an example, **targ** can be used to target the use of a certain client controller or session type.

## Proposal: Server PUB/SUB API

### Requests, Client to Server

"-" ignored or not present

| Keys     | sub (realtime)                | sub (conf changes)                                                   | unsub (realtime) | unsub (conf changes) | pub (realtime)                |
| -------- | ----------------------------- | -------------------------------------------------------------------- | ---------------- | -------------------- | ----------------------------- |
| **type** | sub                           | sub                                                                  | unsub            | unsub                | pub                           |
| **ts**   | -                             | -                                                                    | -                | -                    | _time_                        |
| **ten**  | _tenant-id_                   | _tenant-id_                                                          | _tenant-id_      | _tenant-id_          | _tenant-id_                   |
| **src**  | -                             | -                                                                    | -                | -                    | _source(s)_                   |
| **targ** | -                             | conf                                                                 | -                | conf                 | -                             |
| **arg**  | {"subChannel": _sub-channel_} | {"action": _CUD_, "entityClass": _entity-class_, "rid": _record-id_} | -                | -                    | {"subChannel": _sub-channel_} |
| **ch**   | _channel-record-id_           | -                                                                    | _channel_        | _channel_            | _channel-record-id_           |
| **sig**  | -                             | -                                                                    | -                | -                    | _data_                        |
| **pl**   | -                             | -                                                                    | -                | -                    | _data_                        |

### Replies on above

| Keys     | sub (realtime)          | sub (conf changes)      | unsub (realtime) | unsub (conf changes) | pub (realtime) |
| -------- | ----------------------- | ----------------------- | ---------------- | -------------------- | -------------- |
| **type** | rep                     | rep                     | -                | -                    | -              |
| **ok**   | true/false              | true/false              | -                | -                    | -              |
| **pl**   | _channel/error-message_ | _channel/error-message_ | -                | -                    | -              |

### Messages, Server to Client

| Keys     | pub (realtime) | pub (conf changes) |
| -------- | -------------- | ------------------ |
| **type** | pub            | pub                |
| **ts**   | _time_         | _time_             |
| **src**  | _source(s)_    | _source(s)_        |
| **ch**   | _channel_      | _channel_          |
| **sig**  | _data_         | _data_             |
| **pl**   | _data_         | _data_             |

Latency (lat) can be appended to the message as it reaches a server or central message brokering system.

## Proposal: Server REQ/REP API

### Requests, Client to Server

| Keys     | req                      |
| -------- | ------------------------ |
| **type** | req                      |
| **mid**  | _message-id_             |
| **ten**  | _tenant-id_              |
| **targ** | _module-id_              |
| **arg**  | _API-function-arguments_ |
| **sig**  | _API-function_           |

### Replies on above

| Keys     | rep                   |
| -------- | --------------------- |
| **type** | rep                   |
| **mid**  | _mirrored-message-id_ |
| **ok**   | true/false            |
| **sig**  | _error-code_          |
| **pl**   | _data/error-message_  |

# Changelog

## 3.0

- ct renamed to ts and old ts removed.
- lat (latency) added.
- Timestamp updated to ISO 8601 (earlier epoch time).
