def keyboard_listener():
    try:
        import msvcrt
        while True:
            if msvcrt.kbhit():
                key = msvcrt.getwch().lower()
                fn  = _key_actions.get(key)
                if fn:
                    fn()
            time.sleep(0.05)
        return
    except ImportError:
        pass

    try:
        import readchar
        import sys
        import tty
        import termios
        fd = sys.stdin.fileno()
        old = termios.tcgetattr(fd)
        try:
            tty.setraw(fd)
            while True:
                key = sys.stdin.read(1).lower()
                fn  = _key_actions.get(key)
                if fn:
                    fn()
        finally:
            termios.tcsetattr(fd, termios.TCSADRAIN, old)
    except Exception:
        pass
