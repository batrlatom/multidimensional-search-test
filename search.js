VPTreeFactory = require("./vptree.js");
var similarity = require('compute-cosine-similarity');


var list = [];
var dimension = 100;
for (var i = 0, t = 100000; i < t; i++) {
	var arr = [];
	for (var ii = 0, tt = dimension; ii < tt; ii++) {
		arr.push(Math.round(Math.random()))
		list.push(arr);

	}
}







//var list = [x, y, z];


distance = function (a, b) {
	var r = 1 / similarity(a, b);
	return r;
}


// Function from the previous section covering cosine distance
function cosineDistanceMatching(poseVector1, poseVector2) {
	let cosineSimilarity = similarity(poseVector1, poseVector2);
	let distance = 2 * (1 - cosineSimilarity);
	return Math.sqrt(distance);
}

function findMostSimilarMatch(userPose) {
	// search the vp tree for the image pose that is nearest (in cosine distance) to userPose
	let nearestImage = vptree.search(userPose);

	console.log(nearestImage[0].d) // cosine distance value of the nearest match

	// return index (in relation to poseData) of nearest match.
	return nearestImage[0].i;
}


function buildVPTree(data) {
	// Initialize our vptree with our images’ pose data and a distance function
	var vptree = VPTreeFactory.build(data, cosineDistanceMatching);
	return vptree;
}


var vptree = buildVPTree(list);





for (var j = 0; j < 10; j++) {
	var start = Date.now();

	for (var i = 0; i < 1000; i++) {
		//var nearest = vptree.search([-1, -1, 1, 1, 1]); // [{"i":1,"d":3}]
		var arr = []
		for (var ii = 0, tt = dimension; ii < tt; ii++) {
			arr.push(Math.round(Math.random()))
		}

		var nearest = vptree.search(arr);
		/*
		console.log(nearest)
		console.log("index: " + Math.max(nearest))
		var index = nearest[0].i;
		var distance = nearest[0].d; // distance of nearest element is 3
		//console.log("nearest: " + distance)
		console.log(list[index]); // alerts 'democracy'
		*/

	}
	var end = Date.now();

	console.log((end - start) / 1000);
}
