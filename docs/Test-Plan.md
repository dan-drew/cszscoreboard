# Pre-release Test Plan

Please run the following tests before releasing code changes to prevent regressions.

```yaml
Settings:
  - TODO
  
Rounds:
  - TODO
  
Guessing Games:
  Home Shopping H2H:
    - Select "Home Shopping (H2H)" from the Guessing Game settings
    - Enter 5 example "Product with a change" type answers
    - Select the "Guessing Game" view
    - Verify that answers display correctly on TV view
  
Theme Slides:
  1. Select Slide icon
  2. Select any theme from the menu
  3. Enter text in the new slide
  4. Select another theme from the menu
  5. Enter text in the new slide
  6. Activate slide view
  7. Verify slide selector displays in booth and slide 1 shows on TV
  8. Verify changing slides works with mouse and left/right arrow keys
  9. Select Slide icon in booth again
  10. Delete both slides
  11. Verify Slide view option is removed and TV reverts to shield/slate view
  12. Add a slide again
  13. Verify Slide view option reappears
  14. Verify selecting Slide view works again correctly  
```
