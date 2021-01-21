# Evolving Homepage	
This is the repository for the main running demo I did during Fall 2020's offering of PIC 40A (Introduction to Internet Programming). The result is a gallery page with an interactive drawing element, as well as an accompanying submission queue. The development of this page accompanied standard discussion material, and was used to cement concepts and see how they play together. You can check the commit history to see how the page evolved. Below is a summary of what we did.

### Week 1
We built a simple gallery page. Deciding that we wanted some structure to the page, we laid the images out in two tables. At the top of the page, we included a navigation section. 

### Week 4
With an understanding of JavaScript and the DOM now in hand, we added an interactive photo feature to the top of the page; clicking this feature would randomly select a new image to display. 
We also added a user contribution section, which would allow a visitor to draw their own picture onto a canvas element. This included RGB sliders for selecting a color, and made use of cookies to save a visitor's most recently chosen color.

### Week 6
With PHP now in hand, we set our gallery up to be able to save and load user contributions. As we had not yet learned AJAX, saving an image was done by dumping text to a hidden field which was automatically submitted and loading past images was done by dumping the contents of a text file into a hidden div to be processed using some JavaScript we wrote. To make things a bit less hideous, we performed basic compression on the images.

### Week 7
We finished up the work from Week 6 and added a password-protected queue page to moderate submissions, with multiple users.

### Week 8
AJAX was introduced, making it much easier to save and load images. Additionally, we switched from saving images to a text file to saving them as individual image files. 

### Week 9
With CSS in hand, we significantly improved the appearance of our gallery page. We also added an overlay element that could pop up to enlarge a user-selected image from the gallery. 

### Week 10
We used SQLite3 to create a database for storing image metadata, for display in Week 9's new overlay. We also created a database for storing submission metadata, for display in both the queue and main gallery pages.