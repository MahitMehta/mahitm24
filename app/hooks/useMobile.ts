import React, { useCallback, useEffect, useMemo } from "react";
import { useDebounce, useDebouncedCallback } from "use-debounce";

const useMobile = () => {
	const [dimensions, setDimensions] = React.useState({
		height: document.documentElement.clientHeight,
		width: document.documentElement.clientWidth,
	});

	const updateDimensions = useDebouncedCallback(() => {
		setDimensions({
			height: document.documentElement.clientHeight,
			width: document.documentElement.clientWidth,
		});
	}, 250);

	useEffect(() => {
		window.addEventListener("resize", updateDimensions);
		return () => window.removeEventListener("resize", updateDimensions);
	}, [updateDimensions]);

	const isMobile = useMemo(() => {
		return dimensions.width < 768;
	}, [dimensions]);

	return isMobile;
};

export default useMobile;
