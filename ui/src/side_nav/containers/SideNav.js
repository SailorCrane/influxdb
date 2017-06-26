import React, {PropTypes} from 'react'
import {withRouter, Link} from 'react-router'
import {connect} from 'react-redux'

import {
  NavBar,
  NavBlock,
  NavHeader,
  NavListItem,
} from 'src/side_nav/components/NavItems'

import {DEFAULT_HOME_PAGE} from 'shared/constants'

const {bool, shape, string} = PropTypes

const V_NUMBER = VERSION // eslint-disable-line no-undef

const SideNav = React.createClass({
  propTypes: {
    params: shape({
      sourceID: string.isRequired,
    }).isRequired,
    location: shape({
      pathname: string.isRequired,
    }).isRequired,
    isHidden: bool.isRequired,
    logoutLink: string,
  },

  render() {
    const {
      params: {sourceID},
      location: {pathname: location},
      isHidden,
      logoutLink,
    } = this.props

    const sourcePrefix = `/sources/${sourceID}`
    const dataExplorerLink = `${sourcePrefix}/chronograf/data-explorer`
    const showLogout = !!logoutLink

    return isHidden
      ? null
      : <NavBar location={location}>
          <div className="sidebar--item">
            <Link
              to={`${sourcePrefix}/${DEFAULT_HOME_PAGE}`}
              className="sidebar--square sidebar--logo"
            >
              <span className="sidebar--icon icon cubo-uniform" />
            </Link>
          </div>
          <NavBlock icon="cubo-node" link={`${sourcePrefix}/hosts`}>
            <NavHeader link={`${sourcePrefix}/hosts`} title="Host List" />
          </NavBlock>
          <NavBlock icon="graphline" link={dataExplorerLink}>
            <NavHeader link={dataExplorerLink} title="Data Explorer" />
          </NavBlock>
          <NavBlock icon="dash-h" link={`${sourcePrefix}/dashboards`}>
            <NavHeader
              link={`${sourcePrefix}/dashboards`}
              title={'Dashboards'}
            />
          </NavBlock>
          <NavBlock
            matcher="alerts"
            icon="alert-triangle"
            link={`${sourcePrefix}/alerts`}
          >
            <NavHeader link={`${sourcePrefix}/alerts`} title="Alerting" />
            <NavListItem link={`${sourcePrefix}/alerts`}>
              Alert History
            </NavListItem>
            <NavListItem link={`${sourcePrefix}/alert-rules`}>
              Alert Rules
            </NavListItem>
          </NavBlock>
          <NavBlock icon="crown2" link={`${sourcePrefix}/admin`}>
            <NavHeader link={`${sourcePrefix}/admin`} title="Admin" />
          </NavBlock>
          <NavBlock icon="cog-thick" link={`${sourcePrefix}/manage-sources`}>
            <NavHeader
              link={`${sourcePrefix}/manage-sources`}
              title="Configuration"
            />
          </NavBlock>
          <div className="sidebar--bottom">
            <div className="sidebar--item">
              <div className="sidebar--square">
                <span className="sidebar--icon icon zap" />
              </div>
              <div className="sidebar-menu">
                <div className="sidebar-menu--heading">
                  Version: {V_NUMBER}
                </div>
              </div>
            </div>
            {showLogout
              ? <NavBlock icon="user" className="sidebar--item-last">
                  <NavHeader
                    useAnchor={true}
                    link={logoutLink}
                    title="Logout"
                  />
                </NavBlock>
              : null}
          </div>
        </NavBar>
  },
})

const mapStateToProps = ({
  auth: {logoutLink},
  app: {ephemeral: {inPresentationMode}},
}) => ({
  isHidden: inPresentationMode,
  logoutLink,
})

export default connect(mapStateToProps)(withRouter(SideNav))
