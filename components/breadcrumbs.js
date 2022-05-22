import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

export default function CustomBreadcrumbs({ id, title }) {
    return (
        <Breadcrumbs aria-label="breadcrumb" style={{ padding: "20px 0px" }}>
            <Link color="inherit" href="/">
                All Pages
            </Link>
            <Link color="textPrimary" href={`/${id}`} aria-current="page">
                {title}
            </Link>
        </Breadcrumbs>
    );
};