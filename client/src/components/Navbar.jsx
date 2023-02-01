// Libraries
import { useState } from "react";
import { Link } from "react-router-dom";

// MUI Components
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";

// MUI Icons
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircle from "@mui/icons-material/AccountCircle";

// Custom components
import Cart from "./Cart";

// Contexts hooks
import { useCart } from "../contexts/cart";

const NavMenu = ({ anchorElNav, handleCloseNavMenu }) => {
  return (
    <Menu
      anchorEl={anchorElNav}
      keepMounted
      open={Boolean(anchorElNav)}
      onClose={handleCloseNavMenu}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <MenuItem onClick={handleCloseNavMenu}>Home</MenuItem>
      </Link>
      <MenuItem onClick={handleCloseNavMenu}>
        <Link
          to="/all-products"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          All Products
        </Link>
      </MenuItem>
      <Link
        to="/category"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <MenuItem onClick={handleCloseNavMenu}>Category</MenuItem>
      </Link>
    </Menu>
  );
};

const UserMenu = ({ anchorElUser, handleCloseUserMenu }) => {
  return (
    <Menu
      anchorEl={anchorElUser}
      keepMounted
      open={Boolean(anchorElUser)}
      onClose={handleCloseUserMenu}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Link
        to="/account"
        style={{
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <MenuItem onClick={handleCloseUserMenu}>Profile</MenuItem>
      </Link>
      <Link
        to="/checkout-history"
        style={{
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <MenuItem onClick={handleCloseUserMenu}>Checkout History</MenuItem>
      </Link>
    </Menu>
  );
};

function Navbar() {
  const { cartList } = useCart();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorCart, setAnchorCart] = useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenCart = () => {
    setAnchorCart(true);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleCloseCart = () => {
    setAnchorCart(false);
  };
  return (
    <AppBar position="sticky">
      <Container>
        <Toolbar>
          <Box
            sx={{
              display: {
                xs: "none",
                md: "block",
              },
            }}
          >
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "flex",
              }}
            >
              <AdbIcon sx={{ mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: {
                    xs: "none",
                    md: "flex",
                  },
                  fontFamily: "monospace",
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                ZEN EARBUDS
              </Typography>
            </Link>
          </Box>
          <Box
            sx={{
              display: {
                xs: "none",
                md: "block",
              },
              flexGrow: 1,
            }}
          />

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Link
              to="/all-products"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Button sx={{ my: 2, color: "white", display: "block" }}>
                All Products
              </Button>
            </Link>
            <Link
              to="/category"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Button sx={{ my: 2, color: "white", display: "block" }}>
                Categories
              </Button>
            </Link>
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" }, flexGrow: 2 }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <NavMenu {...{ anchorElNav, handleCloseNavMenu }} />
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" }, flexGrow: 1 }}>
            <AdbIcon sx={{ mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                fontFamily: "monospace",
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              ZEN EARBUDS
            </Typography>
          </Box>

          <IconButton
            sx={{ color: "white", ml: 2 }}
            onClick={handleOpenCart}
          >
            <Badge
              badgeContent={cartList.length}
              color="secondary"
              max={20}
            >
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <Cart {...{ anchorCart, handleCloseCart }} />

          <IconButton
            size="large"
            color="inherit"
            onClick={handleOpenUserMenu}
          >
            <AccountCircle />
          </IconButton>
          <UserMenu {...{ anchorElUser, handleCloseUserMenu }} />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
