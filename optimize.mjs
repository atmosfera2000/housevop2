import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';

(async () => {
	await imagemin(['public/assets/img/*.{jpg,png}'], {
		destination: 'public/assets/img/webp',
		plugins: [
			imageminWebp({quality: 80})
		]
	});

	console.log('Images optimized');
})();
