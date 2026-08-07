# Actions Reference

Every available action in the KiCad Schematic Editor: a command that can be assigned to a hotkey via **Preferences** → **Hotkeys**.

## Schematic Editor

Actions available in the Schematic Editor (schematic view, symbol editor, and simulator).

| Action | Default Hotkey | Description |
|--------|-----------------|-------------|
| Align to Bottom | | Aligns selected items to the bottom edge of the item under the cursor |
| Align to Horizontal Center | | Aligns selected items to the horizontal center of the item under the cursor |
| Align to Vertical Center | | Aligns selected items to the vertical center of the item under the cursor |
| Align to Left | | Aligns selected items to the left edge of the item under the cursor |
| Align to Right | | Aligns selected items to the right edge of the item under the cursor |
| Align to Top | | Aligns selected items to the top edge of the item under the cursor |
| Align Items to Grid | | |
| Add Design Variant... | | Add new design variant to the schematic |
| Annotate Schematic... | | Fill in schematic symbol reference designators |
| Annotate Automatically | | Toggle automatic annotation of new symbols |
| Assign Footprints... | | Run footprint assignment tool |
| Clear Net Highlighting | `-` | Clear any existing net highlighting |
| Export Drawing to Clipboard | | Export drawing of current sheet to clipboard |
| Edit Library Symbol... | `Ctrl+Shift+E` | Open the library symbol in the Symbol Editor |
| Edit Sheet Page Number... | | Edit the page number of the current or selected sheet |
| Bulk Edit Symbol Fields... | | Edit a table of fields from all symbols in the schematic |
| Bulk Edit Symbol Library Links... | | Edit a table of links between schematic and library symbols |
| Edit with Symbol Editor | `Ctrl+E` | Open the selected symbol in the Symbol Editor |
| Export Netlist... | | Export file containing netlist in one of several formats |
| Export Symbols... | | Add symbols from schematic to a new or an existing symbol library (does not remove other symbols from this library) |
| Generate Bill of Materials... | | Generate a bill of materials for the current schematic |
| Generate Bill of Materials (External)... | | Generate a bill of materials for the current schematic using external generator |
| Generate Legacy Bill of Materials... | | Generate a bill of materials for the current schematic (Legacy Generator) |
| Highlight Net | `` ` `` | Highlight net under cursor |
| Highlight Nets | | Highlight wires and pins of a net |
| Import Footprint Assignments... | | Import symbol footprint assignments from `.cmp` file created by board editor |
| Import Graphics... | `Ctrl+Shift+F` | Import 2D drawing file |
| Increment Annotations From... | | Increment a subset of reference designators starting at a particular symbol |
| Line Mode for Wires and Buses | | Constrain drawing and dragging to horizontal, vertical, or 45-degree angle motions |
| Line Mode for Wires and Buses | | Draw and drag at any angle |
| Line Mode for Wires and Buses | `Shift+Space` | Switch to next angle snapping mode |
| Line Mode for Wires and Buses | | Constrain drawing and dragging to horizontal or vertical motions |
| Next Symbol Unit | | Open the next unit of the symbol |
| Previous Net Item | `Shift+Tab` | Select previous item on the current net |
| Previous Symbol Unit | | Open the previous unit of the symbol |
| Remap Legacy Library Symbols... | | Remap library symbol references in legacy schematics to the symbol library table |
| Remove Design Variant | | Remove an existing design variant from the schematic |
| Rescue Symbols... | | Find old symbols in project and rename/rescue them |
| Save Current Sheet Copy As... | | Save a copy of the current sheet to another location or name |
| Schematic Setup... | | Edit schematic setup including annotation styles and electrical rules |
| Select on PCB | | Select corresponding items in PCB editor |
| Do not Populate | | Set the do not populate attribute |
| Exclude from Bill of Materials | | Set the exclude from bill of materials attribute |
| Exclude from Board | | Set the exclude from board attribute |
| Exclude from Simulation | | Set the exclude from simulation attribute |
| Show Directive Labels | | |
| Show ERC Errors | | Show markers for electrical rules checker errors |
| Show ERC Exclusions | | Show markers for excluded electrical rules checker violations |
| Show ERC Warnings | | Show markers for electrical rules checker warnings |
| Show Hidden Fields | | |
| Show Hidden Pins | | |
| Net Navigator | | Show/hide the net navigator |
| Show OP Currents | | Show operating point current data from simulation |
| Hierarchy Navigator | `Ctrl+H` | Show/hide the schematic sheet hierarchy navigator |
| Symbol Checker | | Show the symbol checker window |
| Compare Symbol with Library | | Show differences between schematic symbol and its library equivalent |
| Electrical Rules Checker | | Show the electrical rules checker window |
| Show Bus Syntax Help | | |
| Decrement Primary | | Decrement the primary field of the selected item(s) |
| Decrement Secondary | | Decrement the secondary field of the selected item(s) |
| Increment | | Increment the selected item(s) |
| Increment Primary | | Increment the primary field of the selected item(s) |
| Increment Secondary | | Increment the secondary field of the selected item(s) |
| Autoplace All Sheet Pins | | Imports and auto places all sheet pins |
| Close Outline | | Close the in-progress outline |
| Delete Last Point | | Delete the last point added to the current item |
| Draw Arcs | | |
| Draw Bezier Curve | | |
| Draw Circles | | |
| Draw Rectangles | | |
| Draw Rule Areas | | |
| Draw Hierarchical Sheets | `S` | |
| Draw Sheet from Design Block | | Copy design block into project as a sheet on current sheet |
| Place Design Block | `Shift+B` | Add selected design block to current sheet |
| Place Global Labels | `Ctrl+L` | |
| Place Hierarchical Labels | `H` | |
| Place Images | | |
| Place Junctions | `J` | |
| Place Net Labels | `L` | |
| Place Linked Design Block | | Place design block linked to selected group |
| Place Next Symbol Unit | | Place the next unit of the current symbol that is missing from the schematic |
| Place No Connect Flags | `Q` | |
| Place Power Symbols | `P` | |
| Draw Text | `T` | |
| Place Pins from Sheet | | Add sheet pins from existing hierarchical labels found on that sheet |
| Place Symbols | `A` | |
| Save to Linked Design Block | | Save selected group to linked design block |
| Sync All Sheet Pins... | | Synchronize all sheet pins and hierarchical labels |
| Sync Selected Sheet Pins... | | Synchronize selected sheet pins and hierarchical labels |
| Draw Buses | `B` | |
| Draw Lines | `I` | |
| Draw Wires | `W` | |
| Switch Segment Posture | `/` | Switches posture of the current segment |
| Autoplace Fields | `O` | Runs the automatic placement algorithm on the symbol's (or sheet's) fields |
| Break | | Divide into connected segments |
| Change Symbol... | | Assign a different symbol from the library |
| Change Symbols... | | Assign different symbols from the library |
| Cleanup Sheet Pins | | Delete unreferenced sheet pins |
| Convert Stacked Pins | | Convert multiple pins at the same location to a single pin with stacked notation |
| Edit Footprint... | `F` | |
| Edit Reference Designator... | `U` | |
| Edit Text & Graphics Properties... | | Edit text and graphics properties globally across schematic |
| Edit Value... | `V` | |
| Explode Stacked Pin | | Convert a pin with stacked notation to multiple individual pins |
| Find in Net Navigator | | Locate the selected net in the net navigator |
| Mirror Horizontally | `X` | Flips selected item(s) from left to right |
| Mirror Vertically | `Y` | Flips selected item(s) from top to bottom |
| Pin Table... | | Displays pin table for bulk editing of pins |
| Properties... | `E` | |
| Repeat Last Item | `Ins` | Duplicates the last drawn item |
| Rotate Counterclockwise | `R` | |
| Rotate Clockwise | `Shift+R` | |
| Slice | | Divide into unconnected segments |
| Swap | `Alt+S` | Swap positions of selected items |
| Swap Pin Labels | | Swap the labels attached to selected pins |
| Change to Directive Label | | Change existing item to a directive label |
| Change to Global Label | | Change existing item to a global label |
| Change to Hierarchical Label | | Change existing item to a hierarchical label |
| Change to Label | | Change existing item to a label |
| Change to Text | | Change existing item to a text comment |
| Change to Text Box | | Change existing item to a text box |
| Cycle Body Style | | Switch between De Morgan (or other) representations |
| Update Symbol... | | Update symbol to include any changes from the library |
| Update Symbols from Library... | | Update symbols to include any changes from the library |
| Drag | `G` | Move items while keeping their connections |
| Move | `M` | |
| Select/Expand Connection | `Ctrl+4` | Selects a connection or expands an existing selection to pins, symbols, or entire connections |
| Select Node | `Alt+3` | Select a connection item under the cursor |
| Navigate Back | `Alt+Left` | Move backward in sheet navigation history |
| Change Sheet | | Change to provided sheet's contents in the schematic editor |
| Enter Sheet | | Display the selected sheet's contents in the schematic editor |
| Navigate Forward | `Alt+Right` | Move forward in sheet navigation history |
| Leave Sheet | `Alt+Back` | Display the parent sheet in the schematic editor |
| Next Sheet | `PgDn` | Move to next sheet by number |
| Previous Sheet | `PgUp` | Move to previous sheet by number |
| Navigate Up | `Alt+Up` | Navigate up one sheet in the hierarchy |
| Push Pin Length | | Copy pin length to other pins in symbol |
| Push Pin Name Size | | Copy pin name size to other pins in symbol |
| Push Pin Number Size | | Copy pin number size to other pins in symbol |
| Create Corner | | |
| Remove Corner | | |
| Remote Symbols | | Show/hide the remote symbol panel |
| Delete Design Block | | Remove the selected design block from its library |
| Properties... | | Edit properties of design block |
| Save Selection as Design Block... | | Create a new design block from the current selection |
| Save Current Sheet as Design Block... | | Create a new design block from the current sheet |
| Design Blocks | | Show/hide design blocks library |
| Update Design Block from Selection | | Set design block schematic to current selection |
| Update Design Block from Current Sheet | | Set design block schematic to current sheet |
| User-defined Signals... | | Add, edit or delete user-defined simulation signals |
| New Analysis Tab... | `Ctrl+N` | Create a new tab containing a simulation analysis |
| Open Workbook... | `Ctrl+O` | Open a saved set of analysis tabs and settings |
| Probe Schematic... | `Shift+P` | Add a simulator probe |
| Run Simulation | `R` | |
| Save Workbook | `Ctrl+S` | Save the current set of analysis tabs and settings |
| Save Workbook As... | `Ctrl+Shift+S` | Save the current set of analysis tabs and settings to another location |
| Show SPICE Netlist | | |
| Edit Analysis Tab... | | Edit the current analysis tab's SPICE command and plot setup |
| Export Current Plot to Clipboard | | |
| Dark Mode Plots | | Draw plots with a black background |
| Dotted Current/Phase | | Draw secondary signal trace (current or phase) with a dotted line |
| Show Legend | | |
| Show Simulation Console Panel | | |
| Show Simulation Side Panel | | |
| Draw Lines | | Draw connected graphic lines |
| Draw Polygons | | |
| Draw Text Boxes | | |
| Move Symbol Anchor | | |
| Draw Pins | `P` | |
| Draw Text | | |
| Add Symbol to Schematic | | Add the current symbol to the schematic |
| Copy | | |
| Cut | | |
| Delete Symbol | | Remove the selected symbol from its library |
| Derive from Existing Symbol... | | Create a new symbol, derived from an existing symbol |
| Duplicate Symbol | | |
| Edit Symbol | | Show selected symbol on editor canvas |
| Export... | | Export a symbol to a new library file |
| Export Symbol as SVG... | | Create SVG file from the current symbol |
| Export View as PNG... | | Create PNG file from the current view |
| Paste Symbol | | |
| Display previous symbol | | |
| Rename Symbol... | | |
| Save Library As... | `Ctrl+Shift+S` | Save the current library to a new file |
| Save As... | | Save the current symbol to a different library or name |
| Save Copy As... | | Save a copy of the current symbol to a different library or name |
| Show Pin Electrical Types | | Annotate pins with their electrical types |
| Show Hidden Fields | | |
| Show Hidden Pins | | |
| Bulk Edit Symbol Fields... | | Edit a table of fields from all symbols in the library |
| Show Pin Numbers | | Annotate pins with their numbers |
| Bulk Edit Related Symbol Fields... | | Edit a table of fields from all symbols related to the selected symbol |
| Synchronized Pins Mode | | Synchronized Pins Mode. When enabled, propagates all changes (except pin numbers) to other units. Enabled by default for multiunit parts with interchangeable units |
| Update Symbol Fields... | | Update symbol to match changes made in parent symbol |

## Common

Actions available across KiCad, including in the Schematic Editor.

| Action | Default Hotkey | Description |
|--------|-----------------|-------------|
| Close | `Ctrl+W` | |
| Quit | `Ctrl+Q` | |
| Refresh Plugins | | Reload all python plugins and refresh plugin menus |
| Exclude Marker | | Mark current violation in Checker window as an exclusion |
| Next Marker | | |
| Previous Marker | | |
| Add Library... | | Add an existing library folder |
| Center Justify | | Center-justify fields and text items |
| Pan to Center Selected Objects | | |
| Collapse All | | |
| 45 Degree Crosshairs | | Display full-window crosshairs aligned at 45 and 135 degrees |
| Click | `Return` | Performs left mouse button click |
| Double-click | `End` | Performs left mouse button double-click |
| Cursor Down | `Down` | |
| Cursor Down Fast | `Ctrl+Down` | |
| Full-Window Crosshairs | | Display full-window crosshairs aligned at 0 and 90 degrees |
| Cursor Left | `Left` | |
| Cursor Left Fast | `Ctrl+Left` | |
| Cursor Right | `Right` | |
| Cursor Right Fast | `Ctrl+Right` | |
| Small crosshairs | | Use small crosshairs aligned at 0 and 90 degrees |
| Cursor Up | `Up` | |
| Cursor Up Fast | `Ctrl+Up` | |
| Grid Origin... | | Set the grid origin point |
| Edit Grids... | | Edit grid definitions |
| Expand All | | |
| Switch to Fast Grid 1 | `Alt+1` | |
| Switch to Fast Grid 2 | `Alt+2` | |
| Cycle Fast Grid | `Alt+4` | |
| Switch to Next Grid | `N` | |
| Switch to Previous Grid | `Shift+N` | |
| Reset Grid Origin | | |
| Grid Origin | | Place the grid origin point |
| Hide Library Tree | | |
| Inactive Layer View Mode | | Toggle inactive layers between normal and dimmed |
| Inactive Layer View Mode (3-state) | `H` | Cycle inactive layers between normal, dimmed, and hidden |
| Inches | | |
| Left Justify | | Left-justify fields and text items |
| Focus Library Tree Search Field | `Ctrl+L` | |
| Snap to Objects on the Active Layer Only | | Enables snapping to objects on the active layer only |
| Snap to Objects on All Layers | | Enables snapping to objects on all visible layers |
| Toggle Snapping Between Active and All Layers | `Shift+S` | Toggles between snapping on all visible layers and only the active area |
| Millimeters | | |
| Mils | | |
| New... | `Ctrl+N` | Create a new document in the editor |
| Pan Left | `Shift+Left` | |
| Pan Right | `Shift+Right` | |
| Pan Up | `Shift+Up` | |
| Pin Library | | Keep the library at the top of the list |
| Plot... | | |
| Print... | `Ctrl+P` | |
| Quit | | Close the current editor |
| Redo Last Zoom | | Return zoom to level prior to last zoom undo |
| Reset Local Coordinates | `Space` | |
| Revert | | Throw away changes |
| Right Justify | | Right-justify fields and text items |
| Save | `Ctrl+S` | Save changes |
| Save All | | Save all changes |
| Save As... | `Ctrl+Shift+S` | Save current document to another location |
| Save a Copy... | | Save a copy of the current document to another location |
| Select Columns... | | |
| 3D Viewer | `Alt+3` | Show 3D viewer window |
| Calculator Tools | | Run component calculations, track width calculations, etc. |
| Show Context Menu | | Perform the right-mouse-button action |
| Show Datasheet | `D` | Open the datasheet in a browser |
| Footprint Library Browser | | |
| Footprint Editor | | Create, delete and edit board footprints |
| Library Tree | | |
| Switch to Project Manager | | Show project window |
| Draw Bounding Boxes | | |
| Always Show Crosshairs | | Display crosshairs even when not drawing objects |
| Show Grid | | Display background grid in the edit window |
| Grid Overrides | `Ctrl+Shift+G` | Enables item-specific grids that override the current grid |
| Polar Coordinates | | Switch between polar and cartesian coordinate systems |
| Switch units | `Ctrl+U` | Switch between imperial and metric units |
| Undo Last Zoom | | Return zoom to level prior to last zoom action |
| Unpin Library | | No longer keep the library at the top of the list |
| Update PCB from Schematic... | `F8` | Update PCB with changes made to schematic |
| Update Schematic from PCB... | | Update schematic with changes made to PCB |
| Center on Cursor | `F4` | |
| Zoom to All Objects | `Ctrl+Home` | Zoom to all objects on screen |
| Zoom to Fit | `Home` | Zoom to worksheet area if exists or edited object |
| Zoom to Selected Objects | | Zoom to items currently selected |
| Zoom In at Cursor | `F1` | |
| Zoom In | | |
| Zoom In Horizontally | | Zoom in horizontally the plot area |
| Zoom In Vertically | | Zoom in vertically the plot area |
| Zoom Out at Cursor | `F2` | |
| Zoom Out | | |
| Zoom Out Horizontally | | Zoom out horizontally the plot area |
| Remove File | | Remove an embedded file |
| Add Items | | Add items to group |
| Cancel | | Cancel current tool |
| Copy | `Ctrl+C` | Copy selected item(s) to clipboard |
| Copy as Text | `Ctrl+Shift+C` | Copy selected item(s) to clipboard as text |
| Cut | `Ctrl+X` | Cut selected item(s) to clipboard |
| Cycle Arc Editing Mode | `Ctrl+Space` | Switch to a different method of editing arcs |
| Delete | `Del` | Delete selected item(s) |
| Interactive Delete Tool | | Delete clicked items |
| Duplicate | `Ctrl+D` | Duplicates the selected item(s) |
| Find | `Ctrl+F` | |
| Find and Replace | `Ctrl+Alt+F` | |
| Find Next | `F3` | |
| Find Next Marker | `Ctrl+Shift+F3` | |
| Find Previous | `Shift+F3` | |
| Finish | `End` | Finish current tool |
| Group Items | | Group the selected items so that they are treated as a single item |
| Enter Group | | Enter the group to edit items |
| Leave Group | | Leave the current group |
| Measure Tool | `Ctrl+Shift+M` | Interactively measure distance between points |
| Paste | `Ctrl+V` | Paste item(s) from clipboard |
| Paste Special... | `Ctrl+Shift+V` | Paste item(s) from clipboard with options |
| Redo | `Ctrl+Y` | |
| Search | `Ctrl+G` | Show/hide the search panel |
| Select All | `Ctrl+A` | Select all items on screen |
| Lasso | | Set selection mode to use polygon lasso |
| Rectangle | | Set selection mode to use rectangle |
| Undo | `Ctrl+Z` | |
| Ungroup Items | | Ungroup any selected groups |
| Unselect All | `Ctrl+Shift+A` | Unselect all items on screen |
| Select Row(s) | | Select complete row(s) containing the current selected cell(s) |
| Select Column(s) | | Select complete column(s) containing the current selected cell(s) |
| Select Table | | Select parent table of selected cell(s) |
| Select item(s) | | |
| About KiCad | | |
| Configure Paths... | | Edit path configuration environment variables |
| Donate | | Open "Donate to KiCad" in a web browser |
| Get Involved | | Open "Contribute to KiCad" in a web browser |
| Getting Started with KiCad | | Open "Getting Started in KiCad" guide for beginners |
| Help | | Open product documentation in a web browser |
| List Hotkeys... | `Ctrl+F1` | Displays current hotkeys table and corresponding commands |
| Preferences... | `Ctrl+,` | Show preferences for all open tools |
| Report Bug | | Report a problem with KiCad |
| Manage Design Block Libraries... | | Edit the global and project design block library lists |
| Manage Footprint Libraries... | | Edit the global and project footprint library lists |
| Manage Symbol Libraries... | | Edit the global and project symbol library lists |
| Add Column After | | Insert a new table column after the selected cell(s) |
| Add Row Above | | Insert a new table row above the selected cell(s) |
| Add Row Below | | Insert a new table row below the selected cell(s) |
| Delete Column(s) | | Delete columns containing the currently selected cell(s) |
| Delete Row(s) | | Delete rows containing the currently selected cell(s) |
| Merge Cells | | Turn selected table cells into a single cell |
| Unmerge Cells | | Turn merged table cells back into separate cells |

## Notes

- Hotkeys can be reassigned via **Preferences** → **Hotkeys**; the current active hotkey list can always be viewed via **Help** → **List Hotkeys...** (`Ctrl+F1`).
- Actions with no default hotkey are still assignable via the hotkey editor.
- The **Common** actions apply across all KiCad editors (Schematic Editor, Symbol Editor, PCB Editor, Simulator, etc.), not just the Schematic Editor.
- Source: KiCad 10.0.5 Schematic Editor manual, documentation revision `a77c36a3`.

## Related

- [Introduction to the KiCad Schematic Editor](./01-introduction.md)
- [Advanced Topics](./14-advanced-topics.md)
