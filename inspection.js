document.addEventListener('DOMContentLoaded', function () {
  const inspectionSection = document.getElementById('inspection-section');
  
  if (inspectionSection) {
    const initialMarginTop = 600;
    const marginTopReduction = 0;
    const checklistItemsContainer = document.getElementById('checklist-items');

    const checklistItems = [
      {
        label: "Robot is within size limits",
        requirement: "Robot must fit within an 18x18x18 inch (45.72x45.72x45.72 cm) cube."
      },
      {
        label: "Battery is secure",
        requirement: "Battery must be securely fastened and not move."
      },
      {
        label: "No sharp edges",
        requirement: "All edges and corners must be rounded or covered."
      },
      {
        label: "Main power switch is accessible",
        requirement: "The main power switch must be easily accessible."
      },
      {
        label: "Wiring is neat and secure",
        requirement: "All wiring must be properly managed and secured."
      },
      {
        label: "Team number is displayed",
        requirement: "Team number must be visible from two opposite sides of the robot."
      },
      {
        label: "Robot controller is approved",
        requirement: "Robot controller must be one of the approved devices."
      },
      {
        label: "No more than 8 motors",
        requirement: "Robot must not have more than 8 DC motors."
      },
      {
        label: "No more than 12 servos",
        requirement: "Robot must not have more than 12 servos."
      },
      {
        label: "No prohibited materials",
        requirement: "Robot must not contain any prohibited materials (e.g., lead, mercury)."
      }
    ];

    function renderChecklist() {
      checklistItemsContainer.innerHTML = '';
      checklistItems.forEach(item => {
        const li = document.createElement('li');
        li.className = 'checklist-item';
        
        const label = document.createElement('label');
        label.className = 'checklist-label';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'checklist-checkbox';
        
        const requirement = document.createElement('div');
        requirement.className = 'checklist-requirement';
        requirement.textContent = item.requirement;
        
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(` ${item.label}`));
        
        li.appendChild(label);
        li.appendChild(requirement);
        
        checklistItemsContainer.appendChild(li);
      });
    }

    const updateMargin = () => {
      if (window.innerWidth >= 1024) {
        const checkboxes = inspectionSection.querySelectorAll('input[type="checkbox"]');
        const checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length;
        const newMarginTop = initialMarginTop - (checkedCount * marginTopReduction);
        inspectionSection.style.marginTop = `${newMarginTop}px`;
      } else {
        // Reset margin if not in desktop view
        inspectionSection.style.marginTop = '';
      }
    };

    inspectionSection.addEventListener('change', (event) => {
        if (event.target.type === 'checkbox') {
            updateMargin();
        }
    });

    // Also check on window resize
    window.addEventListener('resize', updateMargin);

    // Initial render and margin calculation
    renderChecklist();
    updateMargin();
  }
});