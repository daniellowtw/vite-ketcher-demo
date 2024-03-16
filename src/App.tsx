import React, { useRef, useState } from 'react';
import { Layout, Menu, theme, Breadcrumb, MenuProps, Button, List, Divider } from 'antd';
import {KetcherEditor} from './Ketcher';
import { Footer } from 'antd/es/layout/layout';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Ketcher } from 'ketcher-core';

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [candidateSmile, setCandidateSmile] = useState("");
  const ketcher = useRef<Ketcher | null>(null);
  const [data, setData] = useState<Array<{title: string, description: string, image: Blob}>>([]);

  const addNewMolecule = async () => {
    if (!ketcher.current) return;
    const smiles = await ketcher.current.getSmiles(true);
    const image = await ketcher.current.generateImage(smiles);
    setData([
      ...data,
      {
        title: smiles,
        description: 'Added at ' + new Date().toLocaleTimeString(),
        image: image,
      },
    ]);
  }



  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


  type MenuItem = Required<MenuProps>['items'][number];

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem('Option 1', '1', <PieChartOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
      getItem('Tom', '3'),
      getItem('Bill', '4'),
      getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout >
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              // minHeight: '600px',
              // height: '700px',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <List
              itemLayout="horizontal"
              dataSource={data}
              renderItem={(item, idx) => (
                <List.Item onClick={() => {
                  ketcher.current?.setMolecule(item.title);
                  setCandidateSmile(item.title)}
                  }>
                  <List.Item.Meta
                  avatar={<img src={URL.createObjectURL(item.image)} alt={item.title} height='60px'/>}
                    title={item.title}
                    description={item.description}
                  />
                  <Button type="primary" onClick={() => {
                    setData(data.filter((_, i) => i !== idx));
                  }}>Remove</Button>
                </List.Item>
              )}
            />

            <Divider />
            <b>Candidate:</b> {candidateSmile}
            <Button type="primary" onClick={addNewMolecule}>Add</Button>
            </div>

          <div
            style={{
              padding: 24,
              // minHeight: '600px',
              height: '700px',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <KetcherEditor onchange={setCandidateSmile} ketcherRef={ketcher} />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Footer
        </Footer>
      </Layout>
    </Layout>

  );
};

export default App;