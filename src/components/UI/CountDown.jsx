import React, { useEffect, useRef, useState } from 'react';
const CountDown = ({ expireTime }) => {
	const [timer, setTimer] = useState('');
	const intervalId = useRef(null);
	useEffect(() => {

			function updateTimer() {
				let timeRemaining = expireTime - Date.now();
				if (timeRemaining <= 0) {
					setTimer('Expired');
					clearInterval(intervalId.current);
					return;
				}
				let seconds = Math.floor(timeRemaining / 1000);
				let minutes = Math.floor(seconds / 60);
				let hours = Math.floor(minutes / 60);

				let secondsRemaining = seconds % 60;
				let minutesRemaining = minutes % 60;

				setTimer(
					hours +
						'h ' +
						minutesRemaining +
						'm ' +
						secondsRemaining +
						's',
				);
			}


		updateTimer();
		intervalId.current = setInterval(updateTimer, 1000);

		return () => {
			clearInterval(intervalId.current);
		};
	}, [expireTime]);


	return <div className="de_countdown">{timer}</div>;
};

export default CountDown;
