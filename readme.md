Summary
This data visualization is about the surivivors of the titanic.
We are able to see their age, name, class, fare, and passenger class.
The major patern that emerges hold the truth to the claim of women and childrend first;
women and children were the major survivors of the disaster.
In addition to age and gender the major contributing factor is class,
which is handled on an approximately level here with fare.

Design
Original Design Decision
I have always heard women and children first into lifeboats. THis lead me to 
wonder if this holds true for the titanic? WHat is the best way to show this.
I think the best way to show others this would be a scatter plot so you can
see based on gender and age. I thought the best way to encode this would be to 
see this at the same time. I wanted to look at age and fare on the axis because
they were the only numerical data. Then the decided to compare male and female,
and their survival. I thought survival was the more important so I decided to use color
for that as I thought it was the most important to be able to easily distinguish. After that
i decided that male female would be easy to distinguish via shape. I think it worked relatively
well.

One of the big changes I made was colors. At first it was black and
red and that was too hard to see. Based on that, i changed black to grey and added some
transparency since we could see so much overlap. Also a change i made was going form
linear scale to logarithmic scale for fare. The numbers were too close togehter to get a good
read of the visuals. I also changed how I did my legend after speaking to someone.
My original plan was to have a legend for color and shape, and they told me it would be the 
same size and easier to read if I just had a legend for each state.
Also I want in a next step to come up with a way to switch the graph to look
at different things. Ie if i hit a button, it would look at single vs family instead.

Feedback
1. Came after view 1. 
The entire data set is too close to gether. I like hows its starting
out and its easy to read tell the differences, but you cant get a read of the data

This made sense. This is when I went to the log scale so you could see
the differences in the data

2. After making it to a logarithmic scale
The colors are too dark to see and there is a lot of overlap.
I can tell what we would should take away but a legend is needed, and 
due to the log scale its hard to tell exactly what each value is

I agree with these comments as well. This is where I decided to change black to grey
and changed opacity to .5. This allowed you to see more data where there was a lot
of overlap. I could not figure out for the life of my how to programmatically do legends 
so i sent it with a sketched legend.

3. Semi final review
I like everything you have done. The tooltip is really helpful and i definitely understand
that the take away from the graph being women and children, and rich people were likely to
survive. The things that you really need to change is the legend and the tool tip.
Its hard to see the orange change when it is over the red. Also the legend could be each data point
and convey the same information more clearly. Also i would change the squares to something else

I agree with these points as well. I changed the tooltip hover over from orange
to blue and added each legend point instead of colors and shapes. I agree on the squares comments
as well but i was having a hard time implementing the Shapes API, so i am holding that in reserve
for a late project

Resouces
-interactive data visualization for the web. oreilly media
- For the filter function - http://stackoverflow.com/questions/20335118/filter-data-in-d3-to-draw-either-circle-or-square
-log scale format - https://bl.ocks.org/mbostock/9764126
- log axis https://bl.ocks.org/mbostock/5537697
- tool tip http://www.d3noob.org/2013/01/adding-tooltips-to-d3js-graph.html
- legends http://bl.ocks.org/ZJONSSON/3918369
- figuring out how to highlight and use tool tip - 
http://stackoverflow.com/questions/26696251/multiple-mouseover-events-with-d3-tip
