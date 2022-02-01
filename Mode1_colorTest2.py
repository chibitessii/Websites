from turtle import Screen, Turtle
from colorsys import hsv_to_rgb
import time
import numpy as np

np.random.seed()

RADIUS = 150
NUMBER_OF_WEDGES = 6
SLICE_ANGLE = 360 / NUMBER_OF_WEDGES
FONT_SIZE = 16
FONT = ('Arial', FONT_SIZE, 'bold')

screen = Screen()
screen.title("Win a Prize!")
screen.setup(width=450, height=450)

wheel = Turtle(visible=False)
wheel.penup()
center = wheel.position()
wheel.sety(wheel.ycor() - RADIUS)
hues = [color / NUMBER_OF_WEDGES for color in range(NUMBER_OF_WEDGES)] 

def moveSecondHand():
    start_time = time.time()
    seconds = 5
    degrees = np.random.randint(20, 1000)
    secondHand.penup() 

    while True:
        current_time = time.time()
        elapsed_time = current_time - start_time

        speedtime = np.floor(elapsed_time)-seconds
        secondHand.speed(abs(speedtime))
        secondHand.ondrag(None)

        if secondHand.speed() > 0: 
            secondHand.lt(degrees)
            stop_heading = secondHand.heading()

        if speedtime >= 0:
            secondHand.setheading(stop_heading)
            break

    secondHand.pendown()

for count, hue in enumerate(range(NUMBER_OF_WEDGES)):

    wheel.fillcolor(hsv_to_rgb(hues[(hue) % NUMBER_OF_WEDGES], 1.0, 1.0))
    wheel.begin_fill()
    wheel.circle(RADIUS, extent=SLICE_ANGLE)
    wheel.speed(0)
    position = wheel.position()
    wheel.goto(center)
    wheel.end_fill()
    wheel.goto(position)
    print(position)

    position = np.array(position)
    shiftx = 20
    shifty = 20

    if np.floor(position[1]) > 0:
        if np.floor(position[0]) == 0:
            position[1] = position[1] - shiftx

    if np.floor(position[1]) < 0:
        if np.floor(position[0]) == 0:
            position[1] = position[1] + shiftx

textbox = Turtle('turtle')
textbox.hideturtle()
textbox.color('black')
textbox.penup()
textbox.speed(0)

coords = [(70, -20), (20, 50), (-65,50), (-110, -20), (-75, -75), (20, -75)]
values = ("25", "100", "200", "500", "1000", "5000")
for coord, value in zip(coords, values):
    textbox.goto(coord)
    textbox.write('$'+str(value), font=FONT)

wheel.penup()
secondHand = Turtle('turtle')
secondHand.color("orange")
secondHand.shapesize(stretch_wid=2, stretch_len=5)
moveSecondHand()

screen.exitonclick()