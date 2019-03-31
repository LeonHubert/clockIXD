var isImageChanged = false;
var dayNames = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'];

function timeUpdate()
{
	var d = new Date();
	var hours = d.getHours().toString();
	var minutes = d.getMinutes().toString();
	var seconds = d.getSeconds().toString();
	var day = d.getDay();
	var year = d.getYear();
		
	if(hours < 10) hours = "0" + hours;
	if(minutes < 10) minutes = "0" + minutes;
	if(seconds < 10) seconds = "0" + seconds;

	document.getElementById('timeLabel').innerHTML  = hours + ":" + minutes + ":" + seconds;
	document.getElementById('dayLabel').innerHTML  = dayNames[day];
	document.getElementById('yearLabel').innerHTML  = year+1900;
		
	if(hours >= 18 && !isImageChanged) imageManager(1);
	else if(hours <= 18 && !isImageChanged) imageManager(0);
}

function startImageRotation()
{
	tl = new TimelineMax();
	tl.to('img', 1, {rotation:360, repeatDelay:0, repeat:-1})
}

function imageManager(time)
{
	// 0 = day 1 = night
	tl.to("img", 1, {y:+500}) // move image to bottom
	setTimeout(changeImage, 1000, time);
	tl.to("img", 1, {y:0}) // move image back to original place
	isImageChanged = true;
	setInterval(resetIsImageChanged, 719000); // 12 hours - 1 second to make sure image changes on the exact second the day/night starts
}

function changeImage(time)
{
	switch(time)
	{
		case 0:
		{	
			document.getElementById('representingImage').src = "img/sun.png";
			break;
		}
		case 1:
		{
			document.getElementById('representingImage').src = "img/moon.png";
			break;
		}
	}
}

function resetIsImageChanged()
{
	isImageChanged = false;
}