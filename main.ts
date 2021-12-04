input.onButtonPressed(Button.A, function () {
    basic.showIcon(IconNames.No)
    pins.digitalWritePin(DigitalPin.P16, 1)
})
input.onButtonPressed(Button.B, function () {
    basic.showIcon(IconNames.Yes)
    pins.digitalWritePin(DigitalPin.P16, 0)
})
radio.onReceivedValue(function (name, value) {
    if (name == "go") {
        if (value == 2) {
            basic.showLeds(`
                . . # . .
                . # # . .
                # # # # #
                . # # . .
                . . # . .
                `)
        } else if (value == 1) {
            basic.showLeds(`
                . . # . .
                . . # # .
                # # # # #
                . . # # .
                . . # . .
                `)
        } else if (value == 3) {
            basic.showLeds(`
                . # # # .
                # . # . #
                . . # . .
                . . # . .
                . . # . .
                `)
        } else {
            basic.clearScreen()
        }
    }
})
radio.setGroup(2)
basic.showIcon(IconNames.Duck)
basic.forever(function () {
    if (input.acceleration(Dimension.Y) < -400) {
        radio.sendValue("go", 1)
    } else if (input.acceleration(Dimension.Y) > 400) {
        radio.sendValue("go", 2)
    } else if (input.acceleration(Dimension.X) < 100) {
        radio.sendValue("go", 3)
    } else {
        radio.sendValue("go", 0)
    }
})
