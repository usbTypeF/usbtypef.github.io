# -*- coding: utf-8 -*-
"""
morning_tone.py
Plays data/morning.wav once per day at a configured local time.
Time and enabled state are read from config via the cfg dict.
"""

import os
import sys
import time
import threading
from datetime import datetime

BASE_DIR = os.path.dirname(os.path.abspath(__file__))


def _play(path: str):
    try:
        import winsound
        winsound.PlaySound(path, winsound.SND_FILENAME)
    except ImportError:
        if sys.platform == "darwin":
            os.system(f'afplay "{path}"')
        else:
            os.system(f'aplay "{path}" 2>/dev/null')
    except Exception:
        pass


def morning_tone_loop(cfg: dict):
    """
    Sleeps until the configured time, plays morning.wav, repeats daily.
    Reads MORNING_TONE_ENABLED, MORNING_TONE_TIME, and SOUND_MORNING from cfg.
    """
    fired_today = None

    while True:
        # Re-read relevant values each cycle so config changes take effect
        enabled     = cfg.get("MORNING_TONE_ENABLED", True)
        time_str    = cfg.get("MORNING_TONE_TIME", "07:00")
        sound_path  = cfg.get("SOUND_MORNING",
                               os.path.join(BASE_DIR, "data", "morning.wav"))

        now   = datetime.now()
        today = now.date()

        if enabled:
            try:
                target_hour, target_min = map(int, time_str.split(":"))
            except Exception:
                target_hour, target_min = 7, 0

            if (now.hour == target_hour and now.minute == target_min
                    and fired_today != today):
                if os.path.exists(sound_path):
                    threading.Thread(
                        target=_play, args=(sound_path,), daemon=True
                    ).start()
                fired_today = today

        # Sleep until next minute boundary — zero CPU usage
        seconds_to_next_minute = 60 - now.second
        time.sleep(seconds_to_next_minute)


def start_morning_tone(cfg: dict):
    """Start the morning tone loop as a background daemon thread."""
    threading.Thread(
        target=morning_tone_loop, args=(cfg,), daemon=True
    ).start()
