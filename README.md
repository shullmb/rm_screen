# RAM Mounts - Screen
## Simple rules of the road: 100% client side – no server-side code/components
The working end result is just HTML, JavaScript and CSS - typically what would normally go in the output or /dist folder after building/”transpiling” a front-end app.
No restrictions on framework. Use whatever framework you feel you do your best (React, Angular, Vue, Bootstrap, Semantic, Material, etc), or none at all. 
___
## Mechanics
Write a basic front-end application that obtains and displays data from an external API at http://jst.edchavez.com. Note that the API isn’t fully “RESTful” and not all HTTP methods are implemented/documented, etc. (hence only the tasks below):
1. `GET`: Obtain and list items (Inventory)
2. `GET`: Obtain and list promotions
3. `GET`: Obtain and list shipping options
4. `POST`: Submit an order and display result/response (you can mock it, though see the bonus below)
5. **Optional/bonus**: Mock a full flow order checkout using all the above, navigable, persistence, etc.
___
## Additional/helpful notes:
__No authentication/validations needed – all been disabled. If it’s part of the model, just mock it e.g. “signature”.__
Do as much or as little as you can/want to showcase your front-end powers so pick the framework where you do your best with JavaScript and CSS. Focus on how youstructure your code, how you make it “readable”/grok-able and ultimately maintainable by your peers. We all want to learn and improve each other in a team!
