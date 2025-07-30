# gktaplister
```
         ___                      _   _  __        _           _
        / __|_ _ ___ _  _ _ _  __| | | |/ /___ _ _| |_ _ _ ___| |
       | (_ | '_/ _ \ || | ' \/ _` | | ' </ _ \ ' \  _| '_/ _ \ |
        \___|_| \___/\_,_|_||_\__,_| |_|\_\___/_||_\__|_| \___/_|
████████╗ █████╗ ██████╗ ██╗     ██╗███████╗████████╗███████╗██████╗       ▄                                        
╚══██╔══╝██╔══██╗██╔══██╗██║     ██║██╔════╝╚══██╔══╝██╔════╝██╔══██╗      █                                        
   ██║   ███████║██████╔╝██║     ██║███████╗   ██║   █████╗  ██████╔╝      █                                   
   ██║   ██╔══██║██╔═══╝ ██║     ██║╚════██║   ██║   ██╔══╝  ██╔══██╗     ███                                  
   ██║   ██║  ██║██║     ███████╗██║███████║   ██║   ███████╗██║  ██║  █▄█████▄█                                   
   ╚═╝   ╚═╝  ╚═╝╚═╝     ╚══════╝╚═╝╚══════╝   ╚═╝   ╚══════╝╚═╝  ╚═╝  █▀  █  ▀█     
 ▪Created by Bill Eckerson, with help from ChatGPT, 2025.
 ▪I am not a web developer or programmer. This code is probably garbage, but it
 works.😁

░░░░░░░░▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ RELEASE NOTES ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒░░░░░░░░
```

v1.0 (07.14.2025):
► Full working tap list and editor.
► Editor reads inline beer JSON array and user can edit fields and save a new index.html.

v1.1 (07.15.2025):
► Moved styles, all SVG and JSONs to external files from inline HTML.
► Created master beer-database.json where we can add new beers.
► Created new editor that uses dropdown menus instead of text fields and writes to
beers.json live with PHP (and therefore removed JSON editing instructions from this document).
► Added ability to mark taps as sold out.

v1.2 (07.16.2025):
► Various bugs squashed, some light code cleanup.
► Added theming and ability for end-user to choose themes from taplist_editor.html. Five basic themes
to start: "hyper," "pinku," "lemon-lime," "evening pastel," "vania." Waiting on hardware for deployment.

v1.3 (07.18.2025):
► Added entire new  layer between starfield and HTML called "battle." On this layer, the GK ship
"mascot" flies by in one of three states: "normal," in which it just zooms by the screen, "broken," it
which it slowly drifts by while spinning like a derelict satellite, and "combat," in which a Galaga
alien sprite flies by and the GK ship follows, shooting at it.

To-do:
► Format blue side for 8 taps
► Change red side logic and editor to accomodate both sides

v1.4 (07.20.2025):
► Duplicated taplist and taplist editor into red and blue sides, edited all necessary logic including
PHP calls and JSON organization etc in order to have two separate taplists that share resources but
have independent formatting and saving.
► Removed theming engine per owner request, but left code in, only commented out. If anybody in the
future wants to re-implement the theming you can uncomment the the marked lines in the editor files to
restore the theme control. Themes can be added/modified with the structure in styles.css. I left it all 
in, just in case.
► Fixed a bug in the spaceship spawning that prevented it from spawning from the left or top sides of
the screen.

[DB Editor]
## v.1 07.24.25
Core functionality working. Utility pulls beers from JSON, shows them in table. Can edit, add, remove beers.

## v.12 07.25.25
Added "card" system for individual beers. Selecting a single beer from the dropdown displays a "card" with fields for beer info plus a logo preview for editing single beers.

## v.13 07.25.25
 "Add beer" function creates blank card that user can fill out. Additional format tweaks to card system.

## v.25 07.26.25
Format tweaks. Added database backup function that creates copy of taplist with date and timestamp appended to file name. Added working status messages at top of screen ("Saved!" "Error saving..." "Database backed up, etc").

## v.3 07.27.25
Added "tapper" save animation. Switched from frame to time-based timing. Animation scaled 2X. Additional layout tweaks.

## v.35 07.28.25
Formatted "show all" table. Realized I may need to add a "beer ID" field to JSON to avoid sorting and indexing confusion. Might require rewrites of sections of all three parts. Began calling project "Taplister" and treating all three components as a single entity.


To-do:
► Once onsite, blue side's formatting needs to be changed to accomodate a wooden bezel that partially
obscures the monitor above the bar.
► Add ability to add/remove/change beers from the master beer-database.json.