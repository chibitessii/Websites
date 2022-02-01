from turtle import Screen, Turtle
from colorsys import hsv_to_rgb
from turtle import *
import time
import numpy as np

np.random.seed()

RADIUS = 150
NUMBER_OF_WEDGES = 6
SLICE_ANGLE = 360 / NUMBER_OF_WEDGES
FONT_SIZE = 16
FONT = ('Arial', FONT_SIZE, 'bold')

screen = getscreen()
screen.title("Win a Prize!")
screen.setup(width=450, height=450)
screen.bgcolor("white")
screen.tracer(False)

wheel = Turtle(visible=False)

insideCircle = Turtle()
insideCircle.shape("circle")
insideCircle.color("black")
insideCircle.shapesize(stretch_wid=1)

#screen.numinput("Poker", "Your stakes:", 1000, minval=10, maxval=10000)

wheel.penup()
center = wheel.position()
wheel.sety(wheel.ycor() - RADIUS)
hues = [color / NUMBER_OF_WEDGES for color in range(NUMBER_OF_WEDGES)] 

def moveSecondHand():
    start_time = time.time()
    seconds = 5
    degrees = np.random.randint(20, 1000)

    while True:
        current_time = time.time()
        elapsed_time = current_time - start_time

        speedtime = np.floor(elapsed_time)-seconds
        secondHand.speed(abs(speedtime))

        if speedtime >= 0:
            secondHand.ondrag(None)
            secondHand.penup()
            secondHand.setheading(stop_heading)
            secondHand.pendown()
            break

        if secondHand.speed() > 0: 
            secondHand.penup()
            secondHand.lt(degrees)
            secondHand.pendown()
            stop_heading = secondHand.heading()

        if np.floor(elapsed_time) == seconds:
            secondHand.ondrag(None)
            break

for hue in range(NUMBER_OF_WEDGES):
    wheel.fillcolor(hsv_to_rgb(hues[(hue) % NUMBER_OF_WEDGES], 1.0, 1.0))
 
    wheel.shape('circle')
    wheel.begin_fill()
    wheel.circle(RADIUS, SLICE_ANGLE, steps=1)
    wheel.speed(0)
    position = wheel.position()
    wheel.goto(center)
    wheel.end_fill()
    wheel.goto(position)

textbox = Turtle('turtle')
textbox.hideturtle()
textbox.color('black')
textbox.penup()
textbox.speed(0)

textbox.goto((70, -20))
textbox.write('$'+str(25), move=False, align='left', font=FONT)
textbox.color("gray")
textbox.write('$'+str(25), move=False, align='left', font=('Arial', FONT_SIZE, 'normal'))

textbox.goto((20, 50))
textbox.write('$'+str(100), move=False, align='left', font=FONT)
textbox.color("gray")
textbox.write('$'+str(100), move=False, align='left', font=('Arial', FONT_SIZE, 'normal'))

textbox.goto((-65, 50))
textbox.write('$'+str(200), move=False, align='left', font=FONT)
textbox.color("gray")
textbox.write('$'+str(200), move=False, align='left', font=('Arial', FONT_SIZE, 'normal'))

textbox.goto((-110, -20))
textbox.write('$'+str(500), move=False, align='left', font=FONT)
textbox.color("gray")
textbox.write('$'+str(500), move=False, align='left', font=('Arial', FONT_SIZE, 'normal'))

textbox.goto((-75, -75))
textbox.write('$'+str(1000), move=False, align='left', font=FONT)
textbox.color("gray")
textbox.write('$'+str(1000), move=False, align='left', font=('Arial', FONT_SIZE, 'normal'))

textbox.goto((20, -75))
textbox.write('$'+str(5000), move=False, align='left', font=FONT)
textbox.color("gray")
textbox.write('$'+str(5000), move=False, align='left', font=('Arial', FONT_SIZE, 'normal'))

screen.tracer(True)

secondHand = Turtle('turtle')
secondHand.pensize(1)
secondHand.color('orange')
secondHand.shapesize(stretch_wid=2, stretch_len=5)
moveSecondHand()

screen.exitonclick()