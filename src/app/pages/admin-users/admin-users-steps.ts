export class AdminUsersSteps {
  public static getStepsBasicMobile(): Step[] {
    return [
      {
        element: "#idAdmin",
        title: "Tutorial",
        description:
          "A continuación podrás ver un breve tutorial de las funciones del módulo",
      },
      {
        element: ".cls-edit",
        title: "Editar",
        description: /*html*/ `
                    <div class="cls-column  cls-gap-10">
                      <span>
                        Clic aquí para iniciar la <b>edición</b> de un usuario.
                      </span>
                      <span>
                        Una vez se inicie la edición podrás modificar el nombre del usuario.
                      </span>
                      <span>
                        Presiona la tecla <b>Enter</b> para guardar.
                      </span>
                    </div>`,
      },
      {
        element: ".cls-delete",
        title: "Eliminar",
        description: /*html*/ `
                    <div class="cls-column  cls-gap-10">
                      <span>
                        Clic aquí para iniciar la <b>eliminación</b> de un usuario.
                      </span>
                      <span>
                        Una vez se inicie la eliminación, se te solicitará una confirmación.
                      </span>
                    </div>`,
      },
    ];
  }
}

export interface Step {
  element: string;
  title: string;
  description: string;
}
