import pygame
from pygame.locals import *
from OpenGL.GL import *
from OpenGL.GLU import *

WIDTH, HEIGHT = 900, 700
X_MIN, X_MAX = -5.0, 5.0
Y_MIN, Y_MAX = -4.0, 4.0

INSIDE, LEFT, RIGHT, BOTTOM, TOP = 0, 1, 2, 4, 8


def region_code(x, y):
    code = INSIDE
    if x < X_MIN:
        code |= LEFT
    elif x > X_MAX:
        code |= RIGHT
    if y < Y_MIN:
        code |= BOTTOM
    elif y > Y_MAX:
        code |= TOP
    return code


def cohen_sutherland(x1, y1, x2, y2):
    c1, c2 = region_code(x1, y1), region_code(x2, y2)
    while True:
        if not (c1 | c2):
            return True, (x1, y1, x2, y2)
        if c1 & c2:
            return False, None

        out = c1 if c1 else c2
        if out & TOP:
            x = x1 + (x2 - x1) * (Y_MAX - y1) / (y2 - y1)
            y = Y_MAX
        elif out & BOTTOM:
            x = x1 + (x2 - x1) * (Y_MIN - y1) / (y2 - y1)
            y = Y_MIN
        elif out & RIGHT:
            y = y1 + (y2 - y1) * (X_MAX - x1) / (x2 - x1)
            x = X_MAX
        else:
            y = y1 + (y2 - y1) * (X_MIN - x1) / (x2 - x1)
            x = X_MIN

        if out == c1:
            x1, y1 = x, y
            c1 = region_code(x1, y1)
        else:
            x2, y2 = x, y
            c2 = region_code(x2, y2)


def draw_line(x1, y1, x2, y2, color, width=2):
    glColor3f(*color)
    glLineWidth(width)
    glBegin(GL_LINES)
    glVertex2f(x1, y1)
    glVertex2f(x2, y2)
    glEnd()


def draw_window():
    glColor3f(0.2, 0.55, 1.0)
    glLineWidth(3)
    glBegin(GL_LINE_LOOP)
    glVertex2f(X_MIN, Y_MIN)
    glVertex2f(X_MAX, Y_MIN)
    glVertex2f(X_MAX, Y_MAX)
    glVertex2f(X_MIN, Y_MAX)
    glEnd()


pygame.init()
pygame.display.gl_set_attribute(pygame.GL_CONTEXT_MAJOR_VERSION, 2)
pygame.display.gl_set_attribute(pygame.GL_CONTEXT_MINOR_VERSION, 1)
pygame.display.set_mode((WIDTH, HEIGHT), DOUBLEBUF | OPENGL)
pygame.display.set_caption('Lab 5 - Cohen-Sutherland Line Clipping')

glMatrixMode(GL_PROJECTION)
glLoadIdentity()
gluOrtho2D(-10, 10, -8, 8)
glMatrixMode(GL_MODELVIEW)

glClearColor(0.04, 0.05, 0.08, 1.0)
original = (-8.0, -6.0, 8.0, 6.0)
accepted, clipped = cohen_sutherland(*original)

running = True
while running:
    for event in pygame.event.get():
        if event.type == QUIT or (event.type == KEYDOWN and event.key == K_ESCAPE):
            running = False

    glClear(GL_COLOR_BUFFER_BIT)
    glLoadIdentity()

    draw_line(-10, 0, 10, 0, (0.25, 0.25, 0.3), 1)
    draw_line(0, -8, 0, 8, (0.25, 0.25, 0.3), 1)
    draw_window()
    draw_line(*original, (1.0, 0.25, 0.25), 2)

    if accepted:
        draw_line(*clipped, (0.2, 1.0, 0.45), 5)

    pygame.display.flip()

pygame.quit()
