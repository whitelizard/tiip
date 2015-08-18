describe('tiip', function(){
    beforeEach(module('tiip'));
    
    it('create', inject(function(tiip){ //parameter name = service name
        
        expect( tiip.unpack(tiip.pack('signal', ['payload'], 'type', 'pid', true, 'destination', 'source', 'mid')) )
        .toEqual(jasmine.objectContaining({
            signal: 'signal',
            payload: ['payload'],
            type: 'type',
            pid: 'pid',
            ok: true,
            destination: 'destination',
            source: 'source',
            mid: 'mid'
        }));
        
    }))

})
