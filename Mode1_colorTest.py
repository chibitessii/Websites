import turtle, time
import numpy as np

screen = turtle.Screen()

Image = "modifiedwheel.gif"
screen.register_shape(Image)

wheel = turtle.Turtle(Image)
wheel.shape(Image)

def left():
    wheel.shape("modifiedwheel.gif")
    wheel.left(20)

def right():
    wheel.shape("wheel_right.gif")
    wheel.right(20)

left()

screen.mainloop()