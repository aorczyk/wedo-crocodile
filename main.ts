pins.setPull(DigitalPin.P1, PinPullMode.PullUp)
pfTransmitter.connectIrSenderLed(AnalogPin.P0)

let lastState = -1;

basic.forever(function () {
    let state = pins.digitalReadPin(DigitalPin.P1);

    if (lastState != state){
        if (state == 0){
            pfTransmitter.singleOutputMode(PfChannel.Channel1, PfOutput.Red, PfSingleOutput.Backward7)
            basic.pause(200);
            pfTransmitter.singleOutputMode(PfChannel.Channel1, PfOutput.Red, PfSingleOutput.BrakeThenFloat)
            basic.pause(1000);
            pfTransmitter.singleOutputMode(PfChannel.Channel1, PfOutput.Red, PfSingleOutput.Forward3)
            basic.pause(200);
            pfTransmitter.singleOutputMode(PfChannel.Channel1, PfOutput.Red, PfSingleOutput.BrakeThenFloat)
        }

        lastState = state;
    }
})

pfReceiver.connectIrReceiver(DigitalPin.P2)
let isOpen = true;

pfReceiver.onRCcommand(PfReceiverChannel.Channel2, PfControl.Forward, PfControl.Float, PfAction.Pressed, function() {
    if (isOpen){
        pfTransmitter.singleOutputMode(PfChannel.Channel1, PfOutput.Red, PfSingleOutput.Backward7)
        basic.pause(200);
        pfTransmitter.singleOutputMode(PfChannel.Channel1, PfOutput.Red, PfSingleOutput.BrakeThenFloat)
        isOpen = false
    }
})

pfReceiver.onRCcommand(PfReceiverChannel.Channel2, PfControl.Float, PfControl.Float, PfAction.Pressed, function() {
    if (!isOpen) {
        pfTransmitter.singleOutputMode(PfChannel.Channel1, PfOutput.Red, PfSingleOutput.Forward3)
        basic.pause(200);
        pfTransmitter.singleOutputMode(PfChannel.Channel1, PfOutput.Red, PfSingleOutput.BrakeThenFloat)
        isOpen = true
    }
})