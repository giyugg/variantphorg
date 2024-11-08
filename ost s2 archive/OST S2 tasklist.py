from tabulate import tabulate

tasks = [
    ["Markdown File for osu!Supporternament S2", "In progress.", "", ""],
    ["BBCode File for osu!Supporternament S2", "To be created again.", "Current version sucks.", ""]
]

headers = ["Task", "Status", "Reason", "Notes"]

print(tabulate(tasks, headers=headers, tablefmt="grid"))
