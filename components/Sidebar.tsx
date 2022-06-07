import {
	List,
	Divider,
	ListItem,
	ListIcon,
	Box,
	Center,
	LinkBox,
	LinkOverlay,
} from "@chakra-ui/layout";
import {
	MdHome,
	MdSearch,
	MdLibraryMusic,
	MdPlaylistAdd,
	MdFavorite,
} from "react-icons/md";
import NextImage from "next/image";
import NextLink from "next/link";
import { MenuIcon } from "@chakra-ui/react";
import { IconType } from "react-icons";

type MenuItem = {
	name: string;
	icon: IconType;
	route: string;
};

const navMenu: MenuItem[] = [
	{
		name: "Home",
		icon: MdHome,
		route: "/",
	},
	{
		name: "Search",
		icon: MdSearch,
		route: "/search",
	},
	{
		name: "Your Library",
		icon: MdLibraryMusic,
		route: "/library",
	},
];

const musicMenu: MenuItem[] = [
	{
		name: "Create Playlist",
		icon: MdPlaylistAdd,
		route: "/",
	},
	{
		name: "Favorites",
		icon: MdFavorite,
		route: "/favories",
	},
];

const playList = new Array(30).fill(1).map((_, i) => `Playlist ${i + 1}`);

const MenuItem = ({ menuList }) => {
	return (
		<List spacing={2}>
			{menuList.map(menu => (
				<ListItem paddingX="20px" fontSize="16px" key={menu.name}>
					<LinkBox>
						<NextLink href={menu.route} passHref>
							<LinkOverlay>
								<ListIcon as={menu.icon} color="white" marginRight="20px" />
								{menu.name}
							</LinkOverlay>
						</NextLink>
					</LinkBox>
				</ListItem>
			))}
		</List>
	);
};

const Sidebar = () => {
	return (
		<Box
			width="100%"
			height="calc(100vh - 100px)"
			bg="black"
			paddingX="5px"
			color="gray"
		>
			<Box paddingY="20px" height="100%">
				<Box width="120px" marginBottom="20px" paddingX="20px">
					<NextImage src="/logo.svg" height={60} width={120} />
				</Box>
				<Box marginBottom="20px">
					<MenuItem menuList={navMenu} />
				</Box>
				<Box marginY="20px">
					<MenuItem menuList={musicMenu} />
				</Box>
				<Divider color="gray.800" />
				<Box height="66%" overflowY="auto" paddingY="20px">
					<List spacing={2}>
						{playList.map(playlist => (
							<ListItem paddingX="20px" key={playlist}>
								<LinkBox>
									{/* <NextLink href="/" passHref /> */}
									<LinkOverlay>{playlist}</LinkOverlay>
								</LinkBox>
							</ListItem>
						))}
					</List>
				</Box>
			</Box>
		</Box>
	);
};

export default Sidebar;
