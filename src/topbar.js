import React from 'react';
import { observer } from 'mobx-react-lite';
import {
  Button,
  Navbar,
  Alignment,
  Dialog,
  Classes,
  Icon,
  Menu,
  MenuDivider,
  MenuItem,
  Checkbox
} from '@blueprintjs/core';

import { downloadFile } from 'polotno/utils/download';

import { Popover2 } from "@blueprintjs/popover2";

import logo from './assets/logosvg@2x.svg'
import dashboard from './assets/dashboardsvg@2x.svg'
import files from './assets/filesvg@2x.svg'
import resizes from './assets/resizesvg@2x.svg'

export default observer(({ store }) => {
  const inputRef = React.useRef();

  const [faqOpened, toggleFaq] = React.useState(false);


  const AVAILABLE_SIZES = [];

  AVAILABLE_SIZES["Facebook News Feed"] = {"width":1200,"height":1200};
  AVAILABLE_SIZES["Facebook Stories"] = {"width":1080,"height":1920};
  AVAILABLE_SIZES["Facebook Profile Picture"] = {"width":720,"height":720};
  AVAILABLE_SIZES["Facebook Cover Photo"] = {"width":820,"height":312};
  AVAILABLE_SIZES["Facebook Event Photo"] = {"width":1336,"height":700};
  AVAILABLE_SIZES["Facebook Group Photo"] = {"width":640,"height":334};
  AVAILABLE_SIZES["Facebook Open Graph"] = {"width":720,"height":720};

  AVAILABLE_SIZES["Instagram Feed"] = {"width":1200,"height":1200};
  
  AVAILABLE_SIZES["Instagram Stories"] = {"width":1080,"height":1080};
  
  AVAILABLE_SIZES["Instagram Profile Picture"] = {"width":720,"height":720};
  
  AVAILABLE_SIZES["Linkedin Feed"] = {"width":1200,"height":1200};
  AVAILABLE_SIZES["Linkedin Profile Picture"] = {"width":640,"height":640};
  
  AVAILABLE_SIZES["Linkedin Cover Photo (Business)"] = {"width":1128,"height":191};
  
  AVAILABLE_SIZES["Linkedin Cover Photo (Personal)"] = {"width":792,"height":198};
  AVAILABLE_SIZES["Linkedin Stories"] = {"width":1080,"height":1920};
  AVAILABLE_SIZES["Twitter Feed"] = {"width":1040,"height":584};
  AVAILABLE_SIZES["Twitter Profile Picture"] = {"width":720,"height":720};
  AVAILABLE_SIZES["Twitter Cover Photo"] = {"width":1200,"height":400};
  AVAILABLE_SIZES["Twitter Open Graph"] = {"width":1200,"height":630};
  AVAILABLE_SIZES["Twitter Fleets"] = {"width":1080,"height":1920};
  AVAILABLE_SIZES["Snapchat Stories"] = {"width":1080,"height":1920};
  AVAILABLE_SIZES["Youtube Profile Picture"] = {"width":800,"height":800};
  AVAILABLE_SIZES["Youtube Cover Photo"] = {"width":2048,"height":1152};
  AVAILABLE_SIZES["Youtube Video Thumbnail"] = {"width":1280,"height":720};
  AVAILABLE_SIZES["Youtube Video Watermark"] = {"width":150,"height":150};
  AVAILABLE_SIZES["Pinterest Profile Picture"] = {"width":720,"height":720};
  AVAILABLE_SIZES["Pinterest Square Pin"] = {"width":600,"height":600};
  AVAILABLE_SIZES["Pinterest Short Pin"] = {"width":600,"height":900};
  AVAILABLE_SIZES["Pinterest Medium Pin"] = {"width":600,"height":1260};
  AVAILABLE_SIZES["Pinterest Long Pin"] = {"width":600,"height":1560};
  AVAILABLE_SIZES["Whatsapp Profile Picture"] = {"width":192,"height":192};
  AVAILABLE_SIZES["TikTok Feed"] = {"width":1080,"height":1920};
 


const the_items = ["Facebook News Feed","Facebook Stories","Facebook Profile Picture","Facebook Cover Photo","Facebook Event Photo","Facebook Group Photo","Facebook Profile Picture","Instagram Feed","Instagram Stories","Instagram Profile Picture","Linkedin Feed","Linkedin Profile Picture","Linkedin Cover Photo (Business)","Linkedin Cover Photo (Personal)","Linkedin Stories","Twitter Feed","Twitter Profile Picture","Twitter Cover Photo","Twitter Open Graph","Twitter Fleets","Snapchat Stories","Youtube Profile Picture","Youtube Cover Photo","Youtube Video Thumbnail","Youtube Video Watermark","Pinterest Profile Picture","Pinterest Square Pin","Pinterest Short Pin","Pinterest Medium Pin","Pinterest Long Pin","Whatsapp Profile Picture","TikTok Feed"];

  const fileMenu = (
      <Menu className={Classes.ELEVATION_1}>
        <input class="bp3-input .modifier project-title" type="text" placeholder="Project name" dir="auto" />
        <div className="file-dimensions">1080 x 1024</div>
        <MenuDivider />
        <MenuItem 
          
          text="Create new design" 
          onClick={() => {
            const ids = store.pages
              .map((page) => page.children.map((child) => child.id))
              .flat();
            const hasObjects = ids?.length;
            if (hasObjects) {
              if (!window.confirm('Remove all content for a new design?')) {
                return;
              }
            }
            const pagesIds = store.pages.map((p) => p.id);
            store.deletePages(pagesIds);
            store.addPage();
          }}
        />
        <MenuItem 
          text="Open a design" 
          onClick={() => {
            document.querySelector('#load-project').click();
          }}
        />
          <input
            type="file"
            id="load-project"
            accept=".json,.polotno"
            ref={inputRef}
            style={{ width: '180px', display: 'none' }}
            onChange={(e) => {
              var input = e.target;

              if (!input.files.length) {
                return;
              }

              var reader = new FileReader();
              reader.onloadend = function () {
                var text = reader.result;
                let json;
                try {
                  json = JSON.parse(text);
                } catch (e) {
                  alert('Can not load the project.');
                }

                if (json) {
                  store.loadJSON(json);
                }
              };
              reader.onerror = function () {
                alert('Can not load the project.');
              };
              reader.readAsText(input.files[0]);
            }}
          />
        <MenuDivider />
        <MenuItem text="Show rulers" label="⌘R" />
        <MenuItem text="Show guides" label="⌘;" />
        <MenuItem text="Show margins" />
        <MenuItem text="Show print bleed" />
        <MenuDivider />
        <MenuItem text="Save" label="All changes saved" />
        <MenuItem text="Save to folder" />
        <MenuItem text="Resolved comments" />
        <MenuItem text="Version history" />
        <MenuItem text="Make a copy" />
        <MenuItem
         text="Download"
         onClick={() => {
          const json = store.toJSON();

          const url =
            'data:text/json;base64,' +
            window.btoa(unescape(encodeURIComponent(JSON.stringify(json))));
            downloadFile(url, 'polotno.json');
          }}
        />
        <MenuDivider />
        <MenuItem text="Help" labelElement={<Icon icon="help" />}/>
      </Menu>
  )


  const resizeMenu = (
    <Menu className={Classes.ELEVATION_1}>
      <input class="bp3-input .modifier project-title" type="text" placeholder="Resize photos" dir="auto" />
      <MenuDivider />
      <div className="file-dimensions">Custom size</div>
      <MenuDivider />
      <div className="file-dimensions">All</div>
      {the_items.map((person, index) => (

      <MenuItem 
          text={person} onClick={() => {
             var width = AVAILABLE_SIZES[person]["width"];
            var height = AVAILABLE_SIZES[ person]["height"];
          
            store.setSize(width, height);
          
          }}  />
      
          ))}

    </Menu>
)

  return (
    <Navbar className="navigation">
      <Navbar.Group align={Alignment.LEFT}>
        <img className='app-logo' src={logo} alt='logo'/>
        <ul className='nav-items-list'>
          <li className='nav-item'>
            <img src={dashboard} alt='logo'/>
            <span>Dashboard</span>
          </li>
          <Popover2 content={fileMenu} placement="bottom">
            <li className='nav-item'>
              <img src={files} alt='logo'/>
              <span>File</span>
            </li>
          </Popover2>
          <Popover2 content={resizeMenu} placement="bottom">
            <li className='nav-item'>
              <img src={resizes} alt='logo'/>
              <span>Resize</span>
            </li>
          </Popover2>
        </ul>
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        <Button className="docs-wiggle" outlined intent="primary" icon="cloud-upload">
          Share
        </Button>
        <Button className="docs-wiggle" intent="primary" icon="download">
          Download
        </Button>
      </Navbar.Group>
      <Dialog
        icon="info-sign"
        onClose={() => toggleFaq(false)}
        title="About Polotno Studio"
        isOpen={faqOpened}
        style={{
          width: '80%',
          maxWidth: '700px',
        }}
      >
        <div className={Classes.DIALOG_BODY}>
          <h2>What is Polotno Studio?</h2>
          <p>
            <strong>Polotno Studio</strong> - is a web application to create
            graphical designs. You can mix image, text and illustrations to make
            social media posts, youtube previews, podcast covers, business cards
            and presentations.
          </p>
          <h2>Is it Open Source?</h2>
          <p>
            Partially. The source code is available in{' '}
            <a href="https://github.com/lavrton/polotno-studio" target="_blank">
              GitHub repository
            </a>
            . The repository doesn't have full source.{' '}
            <strong>Polotno Studio</strong> is powered by{' '}
            <a href="https://polotno.dev/" target="_blank">
              Polonto SDK project
            </a>
            . All core "canvas editor" functionality are implemented by{' '}
            <strong>polotno</strong> npm package (which is not open source at
            the time of writing this text).
          </p>
          <p>
            Polotno Studio is build on top of Polotno SDK to provide a
            desktop-app-like experience.
          </p>
          <h2>Who is making Polotno Studio?</h2>
          <p>
            My name is Anton Lavrenov{' '}
            <a href="https://twitter.com/lavrton" target="_blank">
              @lavrton
            </a>
            . I am founder of Polotno project. As the maintainer of{' '}
            <a href="https://konvajs.org/" target="_blank">
              Konva 2d canvas framework
            </a>
            , I created several similar apps for different companies around the
            world. So I decided to compile all my knowledge and experience into
            reusable Polotno project.
          </p>
          <h2>
            Why Polotno Studio has no signups and no ads? How are you going to
            support the project financially?
          </h2>
          <p>
            Instead of monetizing the end-user application{' '}
            <strong>Polotno Studio</strong> I decided to make money around
            developers tools with{' '}
            <a href="https://polotno.dev/" target="_blank">
              Polonto SDK
            </a>
            .
          </p>
          <p>
            <strong>Polotno Studio</strong> is a sandbox application and
            polished demonstration of{' '}
            <a href="https://polotno.dev/" target="_blank">
              Polonto SDK
            </a>{' '}
            usage.
          </p>
          <p>
            With{' '}
            <a href="https://polotno.dev/" target="_blank">
              Polonto SDK
            </a>{' '}
            you can build very different application with very different UI.
          </p>
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button onClick={() => toggleFaq(false)}>Close</Button>
          </div>
        </div>
      </Dialog>
    </Navbar>
  );
});
