import { EyeIcon, EyeOffIcon, type LucideProps } from "lucide-react";

export const Icons = {
	logo: (props: LucideProps) => (
		<svg role="img" viewBox="0 0 24 24" {...props}>
			<mask
				id="mask0_390_637"
				maskUnits="userSpaceOnUse"
				x="0"
				y="0"
				width="24"
				height="24"
			>
				<path d="M0 5.36442e-07H24V24H0V5.36442e-07Z" fill="white" />
			</mask>
			<g mask="url(#mask0_390_637)">
				<path
					d="M10.0798 0.594339C10.2909 0.556281 10.5167 0.612099 10.6877 0.741493C11.4615 1.26922 12.1663 1.90097 12.757 2.62811C13.3776 3.38824 13.8693 4.25087 14.2174 5.16678C14.6035 6.18366 14.8176 7.26094 14.8872 8.3443C14.9592 9.48601 14.8785 10.6369 14.6573 11.7588C14.6289 11.8978 14.6705 12.0465 14.7623 12.1541C14.9658 12.3961 15.3504 12.4555 15.6199 12.2931C15.9644 12.0622 16.2938 11.807 16.5931 11.5203C16.8915 11.2331 17.164 10.9119 17.3578 10.5435C17.4162 10.4385 17.4461 10.3131 17.54 10.2309C17.7303 10.0391 18.051 9.99902 18.2834 10.1375C18.3813 10.1913 18.4417 10.2898 18.5097 10.3755C19.1156 11.1717 19.5738 12.08 19.8478 13.0431C20.1355 14.0478 20.2202 15.1083 20.1137 16.148C20.0386 16.9163 19.8544 17.6744 19.5586 18.3873C18.8055 20.2181 17.3629 21.7577 15.5763 22.6132C14.9541 22.9136 14.2914 23.1262 13.612 23.2495C12.5439 23.4621 11.4351 23.4773 10.366 23.2663C8.69603 22.944 7.14329 22.0662 5.9965 20.8118C5.37186 20.1303 4.86392 19.3418 4.50263 18.4908C4.03732 17.4014 3.8171 16.211 3.84399 15.0271C3.85871 13.8281 4.06472 12.6214 4.53308 11.5127C4.89031 10.6511 5.39825 9.86151 5.95337 9.11508C6.63282 8.19511 7.3762 7.31929 7.98258 6.34706C8.4418 5.626 8.81933 4.85116 9.0908 4.03927C9.42063 3.06044 9.59417 2.03442 9.66115 1.00536C9.66978 0.785132 9.87478 0.626814 10.0798 0.594339Z"
					fill="#F59E0B"
				/>
			</g>
		</svg>
	),
	eye: EyeIcon,
	eyeOff: EyeOffIcon,
	google: (props: LucideProps) => (
		<svg role="img" viewBox="0 0 24 24" {...props}>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M23.52 12.2727C23.52 11.4218 23.4436 10.6036 23.3018 9.81812H12V14.4599H18.4582C18.18 15.9599 17.3345 17.2308 16.0636 18.0817V21.0927H19.9418C22.2109 19.0036 23.52 15.9272 23.52 12.2727Z"
				fill="#4285F4"
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M11.9999 23.9998C15.2399 23.9998 17.9562 22.9252 19.9417 21.0925L16.0635 18.0816C14.989 18.8016 13.6144 19.2271 11.9999 19.2271C8.87443 19.2271 6.22897 17.1161 5.28534 14.2798H1.27625V17.3889C3.25079 21.3107 7.30897 23.9998 11.9999 23.9998Z"
				fill="#34A853"
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M5.28545 14.2802C5.04545 13.5602 4.90909 12.7911 4.90909 12.0002C4.90909 11.2093 5.04545 10.4402 5.28545 9.72017V6.61108H1.27636C0.463636 8.23108 0 10.0638 0 12.0002C0 13.9365 0.463636 15.7693 1.27636 17.3893L5.28545 14.2802Z"
				fill="#FBBC05"
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M11.9999 4.77273C13.7617 4.77273 15.3435 5.37818 16.5872 6.56727L20.029 3.12545C17.9508 1.18909 15.2344 0 11.9999 0C7.30897 0 3.25079 2.68909 1.27625 6.61091L5.28534 9.72C6.22897 6.88364 8.87443 4.77273 11.9999 4.77273Z"
				fill="#EA4335"
			/>
		</svg>
	),
	facebook: (props: LucideProps) => (
		<svg role="img" viewBox="0 0 24 24" {...props}>
			<path
				d="M24 12C24 5.3726 18.6274 2.65179e-05 12 2.65179e-05C5.37258 2.65179e-05 0 5.3726 0 12C0 17.9896 4.38823 22.954 10.125 23.8542V15.4688H7.07813V12H10.125V9.35628C10.125 6.34878 11.9165 4.68753 14.6576 4.68753C15.9705 4.68753 17.3438 4.9219 17.3438 4.9219V7.87503H15.8306C14.3399 7.87503 13.875 8.80003 13.875 9.74902V12H17.2031L16.6711 15.4688H13.875V23.8542C19.6118 22.954 24 17.9896 24 12Z"
				fill="#1877F2"
			/>
			<path
				d="M16.6711 15.4687L17.2031 12H13.875V9.74899C13.875 8.80001 14.3399 7.875 15.8306 7.875H17.3438V4.92187C17.3438 4.92187 15.9705 4.6875 14.6576 4.6875C11.9165 4.6875 10.125 6.34875 10.125 9.35625V12H7.07812V15.4687H10.125V23.8542C10.7359 23.9501 11.3621 24 12 24C12.6379 24 13.2641 23.9501 13.875 23.8542V15.4687H16.6711Z"
				fill="white"
			/>
		</svg>
	),
	apple: (props: LucideProps) => (
		<svg role="img" viewBox="0 0 24 24" {...props}>
			<path
				d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
				fill="currentColor"
			/>
		</svg>
	),
	github: (props: LucideProps) => (
		<svg role="img" viewBox="0 0 96 96" {...props}>
			<path
				d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
				fill="#24292f"
			/>
		</svg>
	),
};
