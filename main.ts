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
