"""
============================================================
ExamOS • College Examination Hall Management Web UI Launcher
============================================================
This script starts a lightweight local HTTP server and automatically
opens the modern web dashboard in your default browser.
"""

import http.server
import socketserver
import webbrowser
import os
import sys
import threading
import time

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def log_message(self, format, *args):
        # Keep terminal clean with timestamped requests
        sys.stdout.write(f"[{time.strftime('%H:%M:%S')}] {format % args}\n")

def open_browser():
    time.sleep(0.8)
    url = f"http://localhost:{PORT}/index.html"
    print(f"\n[ExamOS] Opening modern web UI in default browser: {url}\n")
    webbrowser.open(url)

def main():
    print("=" * 65)
    print("      EXAMOS • COLLEGE EXAMINATION HALL MANAGEMENT SYSTEM")
    print("          MODERN WEB INTERFACE (HTML5 / CSS3 / ES6)")
    print("=" * 65)
    print(f"\nServing web application from: {DIRECTORY}")
    print(f"Local Server URL: http://localhost:{PORT}/index.html")
    print("Press Ctrl+C to terminate the server.\n")

    # Open browser automatically in background thread
    threading.Thread(target=open_browser, daemon=True).start()

    # Allow port reuse immediately
    socketserver.TCPServer.allow_reuse_address = True

    try:
        with socketserver.TCPServer(("", PORT), Handler) as httpd:
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n[ExamOS] Server shutting down gracefully. Goodbye!")
    except OSError as e:
        print(f"\n[ExamOS] Port {PORT} is busy, attempting port {PORT + 1}...")
        try:
            with socketserver.TCPServer(("", PORT + 1), Handler) as httpd:
                print(f"Local Server URL: http://localhost:{PORT + 1}/index.html")
                webbrowser.open(f"http://localhost:{PORT + 1}/index.html")
                httpd.serve_forever()
        except Exception as err:
            print(f"[ExamOS] Error: {err}")

if __name__ == "__main__":
    main()
